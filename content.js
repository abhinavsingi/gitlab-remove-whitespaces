var REMOVE_NODE = true; //Paramaeter to determine if the node is to be deleted or only colors are to be hidden
var REGEX_TO_MATCH_WHITE_SPACES = /(\r\n|\n|\r| )/gm;
var STRING_TO_REPLACE_WITH = '';

function handleWhiteSpacesInGitlabMergeRequests() {
  var line_holders = document.querySelector('.files').querySelectorAll('.line_holder');

  line_holders.forEach(line_holder => {
    var lineContent = line_holder.querySelectorAll('.line_content');
    var oldLineContent = lineContent[0];
    var newLineContent = lineContent[1];
    var diffIsShown = oldLineContent.classList.contains('old') || newLineContent.classList.contains('new'); //to make sure change is shown on both left and right

    if (diffIsShown) {
      var isWrondDiffShown = oldLineContent.textContent.replace(REGEX_TO_MATCH_WHITE_SPACES, STRING_TO_REPLACE_WITH) === newLineContent.textContent.replace(REGEX_TO_MATCH_WHITE_SPACES, STRING_TO_REPLACE_WITH);
      //trim all whitespaces
      if (isWrondDiffShown) {
        if (REMOVE_NODE) {
          console.log('Removing this node: ', line_holder);
          line_holder.remove()
        } else {
          console.log('Removing colors from this node: ', line_holder);
          line_holder.querySelectorAll('td').forEach(el => el.classList.remove('old', 'new'));
        }
      }
    }
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      handleWhiteSpacesInGitlabMergeRequests();
    }
  }
);