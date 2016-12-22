const difflib = require('./difflib').difflib;

/*
 This is a modified file from the  jsdifflib v1.0. <http://github.com/cemerick/jsdifflib>

 Copyright 2015 Tomas Trescak <t.trescak@uws.edu.au>. All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are
 permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this list of
 conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright notice, this list
 of conditions and the following disclaimer in the documentation and/or other materials
 provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY Chas Emerick ``AS IS'' AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Chas Emerick OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 The views and conclusions contained in the software and documentation are those of the
 authors and should not be interpreted as representing official policies, either expressed
 or implied, of Chas Emerick.
 */
const DiffViewSimple = {
  compare: function(originalText, newText) {
    var base = difflib.stringAsLines(originalText);
    var newtxt = difflib.stringAsLines(newText);
    var sm = new difflib.SequenceMatcher(base, newtxt);
    var opcodes = sm.get_opcodes();

    return DiffViewSimple.buildView({
      baseTextLines: base,
      newTextLines: newtxt,
      opcodes: opcodes
    });
  },
  /**
   * Builds and returns a visual diff view.  The single parameter, `params', should contain
   * the following values:
   *
   * - baseTextLines: the array of strings that was used as the base text input to SequenceMatcher
   * - newTextLines: the array of strings that was used as the new text input to SequenceMatcher
   * - opcodes: the array of arrays returned by SequenceMatcher.get_opcodes()
   * - baseTextName: the title to be displayed above the base text listing in the diff view; defaults
   *     to "Base Text"
   * - newTextName: the title to be displayed above the new text listing in the diff view; defaults
   *     to "New Text"
   * - contextSize: the number of lines of context to show around differences; by default, all lines
   *     are shown
   * - viewType: if 0, a side-by-side diff view is generated (default); if 1, an inline diff view is
   *     generated
   */
  buildView: function (params) {
    var baseTextLines = params.baseTextLines;
    var newTextLines = params.newTextLines;
    var opcodes = params.opcodes;

    if (baseTextLines == null) {
      throw "Cannot build diff view; baseTextLines is not defined.";
    }
    if (newTextLines == null) {
      throw "Cannot build diff view; newTextLines is not defined.";
    }
    if (!opcodes) {
      throw "Cannot build diff view; opcodes is not defined.";
    }

    var output = '';

    function addCellsInline(tidx, tidx2, textLines, change) {
      output += change == 'insert' ? '+ (' : '- (';
      output += tidx == null ? "" : (tidx + 1).toString();
      output += ',';
      output += tidx2 == null ? "" : (tidx2 + 1).toString();
      output += ') '
      output += textLines[tidx != null ? tidx : tidx2].replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0");
      output += '\n';
    }

    for (var idx = 0; idx < opcodes.length; idx++) {
      code = opcodes[idx];
      change = code[0];
      var b = code[1];
      var be = code[2];
      var n = code[3];
      var ne = code[4];
      var rowcnt = Math.max(be - b, ne - n);
      for (var i = 0; i < rowcnt; i++) {
        if (change == "insert") {
          addCellsInline(null, n++, newTextLines, change);
        } else if (change == "replace") {
          if (b < be) addCellsInline(b++, null, baseTextLines, "delete");
          if (n < ne) addCellsInline(null, n++, newTextLines, "insert");
        } else if (change == "delete") {
          addCellsInline(b++, null, baseTextLines, change);
        }
      }
    }

    return output;
  },
  renderDelta: function (history, step, currentStep, currentStepText) {
    // initialise the text
    if (!currentStepText) {
      if (!currentStep) {
        currentStep = 0;
      }
      currentStepText = '';

      for (var i=0; i<=step; i++) {
        currentStepText = apply(currentStepText, history[i].delta, true);
      }
    }

    return currentStepText;

    //// we can either go back a step or forward a step
    //// forwards
    //if (currentStep < step) {
    //  for (var i=currentStep; i<step; i++) {
    //
    //  }
    //}
    //// backward
    //else {
    //  for (var i=currentStep; i>step; i--) {
    //
    //  }
    //}
  }
};

var apply = function(step, delta, forward) {
  var splitDelta = delta.split('\n');
  var stepLines = step.split('\n');
  var added = 0;
  var removed = 0;

  for (var i=0; i<splitDelta.length; i++) {
    var groups = /([+-]) \((\d*),(\d*)\) (.*)/.exec(splitDelta[i]);

    if (!groups) {
      continue;
    }

    var change = groups[1];
    var origLine = groups[2];
    var newLine = groups[3];
    var deltaText = groups[4];

    if (change == '+' && forward || change == '-' && !forward) {
      var idx = parseInt(newLine);
      stepLines.splice(idx - 1, 0, deltaText);
      added++;
    }
    if (change == '-' && forward || change == '+' && !forward) {
      var idx = parseInt(origLine);
      stepLines.splice(idx - 1 + added - removed, 1);

      removed++;
    }
  }

  return stepLines.join('\n');
}

module.exports.DiffViewSimple = DiffViewSimple;