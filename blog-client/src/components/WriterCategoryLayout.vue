<template>
  <div class="category-layout">
    <div class="function-group">
      <router-link class="function-item" to="/">
        <img src="../assets/img/home.png" class="icon">返回首页
      </router-link>
      <span class="function-item cursor-pointer" @click="showAddCategoryModal">
          <img src="../assets/img/add.png" class="icon">添加分类
      </span>
    </div>
    <ul class="category-list">
      <li v-for="category in categories"
          v-dragging="{ item: category, list: categories, group: 'postCategory' }"
          class="item"
          :class="{selected: category.selected}"
          :key="category.id">
        <img src="../assets/img/class.png">
        <span class="category-name">{{category.name}}</span>
        <span class="btn-group text-gray">
          <img src="../assets/img/build.png" class="btn cursor-pointer" title="修改分类"
               @click="showUpdateCategoryModal(category)">
          <img src="../assets/img/delete.png" class="btn cursor-pointer" title="删除分类"
               @click="confirmDeleteCategory(category)">
          <span class="btn cursor-move btn-drag" title="拖动排序"
                @mouseenter="allowCategoryDrag = true" @mouseleave="allowCategoryDrag = false"></span>
        </span>
      </li>
    </ul>

    <!--添加文章分类dialog-->
    <el-dialog title="添加文章分类" :visible.sync="addCategoryDialogVisible" width="30%">
      <el-form :model="toAddCategory" :rules="categoryRule" ref="addCategoryForm">
        <el-form-item label="分类名称：" label-width="96px" prop="name">
          <el-input v-model="toAddCategory.name" placeholder="请输入文章分类名称，最多10个字符"></el-input>
        </el-form-item>
        <el-form-item label="分类链接：" label-width="96px">
          <el-input v-model="toAddCategory.url" placeholder="请输入文章分类链接"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dismissAllModal">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改文章分类dialog-->
    <el-dialog title="修改文章分类" :visible.sync="updateCategoryDialogVisible" :close-on-click-modal="false" width="30%">
      <el-form :model="toUpdateCategory" :rules="categoryRule" ref="updateCategoryForm">
        <el-form-item label="分类名称：" label-width="96px" prop="name">
          <el-input v-model="toUpdateCategory.name" placeholder="请输入文章分类名称，最多10个字符"></el-input>
        </el-form-item>
        <el-form-item label="分类链接：" label-width="96px">
          <el-input v-model="toUpdateCategory.url" placeholder="请输入文章分类链接"></el-input>
        </el-form-item>
        <el-form-item label="分类可见：" label-width="96px">
          <el-switch v-model="toUpdateCategory.visible"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dismissAllModal">取 消</el-button>
        <el-button type="primary" @click="updateCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    mounted() {
      // this.$dragging.$on('dragstart', ({event}) => {
      //   if (!this.allowCategoryDrag) {
      //     event.preventDefault();
      //   }
      // })
    },
    data() {
      return {
        addCategoryDialogVisible: false,
        updateCategoryDialogVisible: false,
        allowCategoryDrag: false,
        categories: [],
        toAddCategory: {name: '', url: ''},
        toUpdateCategory: {name: '', url: '', visible: true},
        currentCategory: null,
        markdown: '',
        categoryRule: {
          name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在1到10个字符', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      this.getCategories();
    },
    methods: {
      getCategories() {
        this.$api.postCategory.list().then(resp => {
          this.categories = resp.data.data
          if (this.categories.length > 0) {
            this.categories[0].selected = true
          }
        }).catch(err => {
          console.error(err)
        })
      },
      showAddCategoryModal() {
        this.addCategoryDialogVisible = true;
        this.toAddCategory = {name: '', url: ''}
      },
      showUpdateCategoryModal(category) {
        this.currentCategory = category
        this.toUpdateCategory = {id: category.id, name: category.name, url: category.url, visible: category.visible}
        this.updateCategoryDialogVisible = true
      },
      dismissAllModal() {
        this.addCategoryDialogVisible = false;
        this.updateCategoryDialogVisible = false;
      },
      addCategory() {
        this.$refs['addCategoryForm'].validate(valid => {
          if (!valid) {
            return false;
          }
          this.$api.postCategory.save(this.toAddCategory).then(resp => {
            this.categories.push(resp.data.data)
            this.dismissAllModal()
            this.$message({message: '文章分类添加成功', type: 'success'});
          }).catch(err => {
            console.log(err.response)
            this.$message.error('添加文章失败：' + err.response.data.error);
          })
        });
      },
      confirmDeleteCategory(category) {
        this.$confirm(`确定要删除【${category.name}】分类吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCategory(category);
        }).catch(() => {
        });
      },
      deleteCategory(category) {
        this.$api.postCategory.delete(category.id).then(resp => {
          this.categories.remove(category)
          this.$message({message: '删除文章分类成功', type: 'success'});
        }).catch(err => {
          this.$message.error('删除文章分类失败：' + err.response.data.error);
        })
      },
      updateCategory() {
        this.$refs['updateCategoryForm'].validate(valid => {
          if (!valid) {
            return
          }
          this.$api.postCategory.patch(this.toUpdateCategory).then(resp => {
            this.currentCategory.name = this.toUpdateCategory.name
            this.currentCategory.url = this.toUpdateCategory.url
            this.currentCategory.visible = this.toUpdateCategory.visible
            this.updateCategoryDialogVisible = false
            this.$message({message: '修改文章分类成功', type: 'success'});
          }).catch(err => {
            this.$message.error('修改文章分类失败：' + err.response.data.error);
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .category-layout {
    width: $writer-category-layout-width;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $writer-category-layout-background;
    color: $writer-category-layout-color;
    height: 100%;
  }

  .function-group {
    margin: $space 0;
  }

  .function-item {
    color: darken($writer-category-layout-color, 6%);
  }

  .function-item:hover {
    color: lighten($writer-category-layout-color, 6%);
  }

  .function-item .icon {
    margin-right: $space-sm;
  }

  .category-list .item {
    padding: $space;
    position: relative;
  }

  .category-list .item:hover, .category-list > .item.selected {
    background-color: lighten($writer-category-layout-background, 4%);
  }

  .category-list .item .btn-group {
    position: absolute;
    right: $space;
  }

  .category-list .item .btn-group > .btn {
    margin-right: $space-sm;
  }
  .category-list .item .btn-group > .btn.btn-drag {
    background: url("../assets/img/drag.png");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: text-bottom;
  }

  .category-name {
    margin: 0 $space-sm;
  }

  .function-item {
    font-size: $page-font-size-sm;
    margin: 0 $space;
  }

</style>
