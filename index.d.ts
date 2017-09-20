interface SimpleOptions {
  /**
   * the array of strings that was used as the base text input to SequenceMatcher
   * 
   * @type {string[]}
   * @memberOf Options
   */
  baseTextLines: string[];
  /**
   * the array of strings that was used as the new text input to SequenceMatcher
   * 
   * @type {string[]}
   * @memberOf Options
   */
  newTextLines: string[];
  /**
   * the array of arrays returned by SequenceMatcher.get_opcodes()
   * 
   * @type {any[][]}
   * @memberOf Options
   */
  opcodes: any[][];
}

interface Options extends SimpleOptions {
  baseTextName?: string;
  /**
   * the title to be displayed above the new text listing in the diff view; defaults to "New Text"
   * 
   * @type {string}
   * @memberOf Options
   */
  newTextName?: string;
  /**
   * the number of lines of context to show around differences; by default, all lines are shown
   * 
   * @type {number}
   * @memberOf Options
   */
  contextSize?: number;
  /**
   * 0 - Horizontal
   * 1 - Inline
   * 
   * @type {number}
   * @memberOf Options
   */
  viewType?: number;
}

interface HistoryStep {
  delta: string;
}

interface IDiff {
  compare(originalText: string, newText: string, baseTextName?: string, newTextName?: string, contextSize?: number, viewType?: 0 | 1): string;
  buildView (params: Options): string;
}

interface IDiffSimple extends IDiff {
  buildView (params: SimpleOptions): string;
  renderDelta (history: HistoryStep[], step: number, currentStep: number, currentStepText?: string): string;
}

export let DiffViewSimple: IDiffSimple;
export let DiffView: IDiff;