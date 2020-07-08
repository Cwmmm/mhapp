<template>
  <section>
    <div class="bar">
    <input type="text" class="s_inp">
    <button class="s_icon">
      搜索
    </button>
    <div class="s_list">
      <h3>123</h3>
    </div>
    </div>
    <ul class="s_hot">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </section>
</template>

<style lang="less" scoped>
section {
  width: 456px;
  margin: 0 auto;
}
.bar {
  border: 3px solid gainsboro;
  border-radius: 5px;
  position: relative;
  input {
    border: 1px solid #eeeeee;
    outline: none;
  }
}
.s_inp {
  height: 40px;
  width: 380px;
}
.s_icon {
  border: 1px solid #eee;
  height: 40px;
  width: 70px;
  float: right;
  :checked {
    background-color: #fff;
  }
}
.s_hot li {
  display: inline-block;
}
.s_hot {
  margin-top: 10px;
  padding-left: 0;
  color: #717171;
}
.s_list {
  display: none;
  position: absolute;
  z-index: 99;
  width: 380px;
  height: 100px;
  background-color: #fff;
}
</style>
