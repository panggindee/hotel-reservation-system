//common functions goes here

var app = angular.module('app.foundation', []);

app.factory("Foundation", function() {
  return {
    //responsive tables from zurb foundation
    responsiveTable: function(switched) {
      if (($(window).width() < 767) && !switched ){
        switched = true;
        $("table.responsive").each(function(i, element) {
          unsplitTable($(element));
          splitTable($(element));
        });
      }
      else if (switched && ($(window).width() > 767)) {
        switched = false;
        $("table.responsive").each(function(i, element) {
          unsplitTable($(element));
        });
      }
      return switched;
    }
  };
});

//responsive tables from zurb foundation
function splitTable(original)
{
  original.wrap("<div class='table-wrapper' />");

  var copy = original.clone();
  copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
  copy.removeClass("responsive");

  original.closest(".table-wrapper").append(copy);
  copy.wrap("<div class='pinned' />");
  original.wrap("<div class='scrollable' />");

  setCellHeights(original, copy);
}

//responsive tables from zurb foundation
function unsplitTable(original) {
  original.closest(".table-wrapper").find(".pinned").remove();
  original.unwrap();
  original.unwrap();
  original.wrap('<div class="row" />');
  original.wrap('<div class="columns" />');
}

//responsive tables from zurb foundation
function setCellHeights(original, copy) {
  var tr = original.find('tr'),
      tr_copy = copy.find('tr'),
      heights = [];

  tr.each(function (index) {
    var self = $(this),
        tx = self.find('th, td');

    tx.each(function () {
      var height = $(this).outerHeight(true);
      heights[index] = heights[index] || 0;
      if (height > heights[index]) heights[index] = height;
    });

  });

  tr_copy.each(function (index) {
    $(this).height(heights[index]);
  });
}
