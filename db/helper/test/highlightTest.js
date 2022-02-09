const hljs = require('highlight.js');
let html = hljs.highlight(`

public static int[][] matrixChainOrder(int[] p) {
    int n = p.length - 1;// n为待求矩阵链的总长度，待求矩阵链为A0A1...A(n-1)
    int[][] record = new int[n][n];// record[i][j]表示AiA(i+1)...Aj最优括号化方案的结果
    // l为子矩阵链的长度，l = 2 to n（长度为1只包含一个矩阵，不需要作乘积，因此不考虑）
    for (int l = 2; l <= n; l++) {
        // i = 0 to n - l，表示起始矩阵的下标
        for (int i = 0; i <= n - l; i++) {
            int j = i + l - 1; // j 表示结束矩阵的下标
            record[i][j] = Integer.MAX_VALUE;
            // k = i to j-1，表示分割点
            for (int k = i; k < j; k++) {
                int q = record[i][k] + record[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
                if (q < record[i][j]) {
                    record[i][j] = q;
                }
            }
        }
    }
    return record;
}

`, {language: 'java'}).value
console.log(html)