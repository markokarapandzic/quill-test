var Quill = require("quill");
require("./node_modules/quill-comment/quill.comment.js");

let toolbarOptions = [
  ["comments-toggle"], // comment color on/off
  ["comments-add"], // comment add
];

let options = {
  theme: "snow",
  modules: {
    toolbar: toolbarOptions,
    // comment setting
    comment: {
      enabled: true,
      commentAuthorId: 123,
      commentAddOn: "Author Name", // any additional info needed
      color: "yellow", // comment background color in the text
      commentAddClick: commentAddClick, // get called when `ADD COMMENT` btn on options bar is clicked
      commentsClick: commentsClick, // get called when you click `COMMENTS` btn on options bar for you to do additional things beside color on/off. Color on/off is already done before the callback is called.
      commentTimestamp: commentServerTimestamp,
    },
  },
};

quill = new Quill("#editor", options);

quill.on("selection-change", function (range, oldRange, source) {
  if (range) {
    if (range.length == 0) {
      console.log("User cursor is on", range.index);
    } else {
      var text = quill.getText(range.index, range.length);
      quill.format("color", "red");
      console.log("User has highlighted:", text);
    }
  } else {
    console.log("Cursor not in the editor");
  }
});

function commentAddClick(callback) {
  // UX works to get comment from user, like showing modal dialog
  // $('#inputCommentModal').modal('show');
  // But after whatever UX works, call the `callback` with comment to pass back comment
  callback(comment);
}

function commentServerTimestamp() {
  // call from server or local time. But must return promise with UNIX Epoch timestamp resolved (like 1507617041)
  return new Promise((resolve, reject) => {
    currentTimestamp = Math.round(new Date().getTime() / 1000);

    resolve(currentTimestamp);
  });
}

function commentsClick() {
  // comments btn callback
  console.log("Clicked on comment");
}
