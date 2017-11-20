package cn.derker.blog.util;


import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.TimeoutException;

/**
 * @author derker
 * @since 2017-10-18 21:41
 */
public class ProcessUtil {

    /**
     * 运行一个外部命令，返回状态.若超过指定的超时时间，抛出TimeoutException
     */
    public static ProcessStatus execute(final long timeout, final String... command)
            throws IOException, InterruptedException, TimeoutException {

        ProcessBuilder pb = new ProcessBuilder(command);
        pb.redirectErrorStream(true);
        Process process = pb.start();

        Worker worker = new Worker(process);
        worker.start();
        ProcessStatus ps = worker.getProcessStatus();
        try {
            worker.join(timeout);
            if (ps.exitCode == ProcessStatus.CODE_STARTED) {
                // not finished
                worker.interrupt();
                throw new TimeoutException();
            } else {
                return ps;
            }
        } catch (InterruptedException e) {
            // canceled by other thread.
            worker.interrupt();
            throw e;
        } finally {
            process.destroy();
        }
    }

    private static class Worker extends Thread {
        private final Process process;
        private ProcessStatus ps;

        private Worker(Process process) {
            this.process = process;
            this.ps = new ProcessStatus();
        }

        @Override
        public void run() {
            try {
                InputStream is = process.getInputStream();
                try {
                    ps.output = IOUtil.readAndClose(is);
                } catch (IOException ignore) {
                }
                ps.exitCode = process.waitFor();

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        public ProcessStatus getProcessStatus() {
            return this.ps;
        }
    }

    public static class ProcessStatus {

        private static final int CODE_STARTED = -257;

        private volatile int exitCode;
        private volatile String output;

        public int getExitCode() {
            return exitCode;
        }

        public void setExitCode(int exitCode) {
            this.exitCode = exitCode;
        }

        public String getOutput() {
            return output;
        }

        public void setOutput(String output) {
            this.output = output;
        }
    }
}
