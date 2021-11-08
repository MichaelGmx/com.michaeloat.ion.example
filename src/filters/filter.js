uxFilters

  // 電話號碼格式化（暫時方案）
  .filter("phone", function () {
    return function (input) {
      var value = input || '';
      return value.substr(0, 4) + " " + value.substr(4, 4);
    }
  })
