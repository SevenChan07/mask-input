import React from 'react'
import PropTypes from 'prop-types'
import InputMask from 'inputmask-core'
import './mask-input.stylus'

function getSelection(el) {
  let start, end
  if (el.selectionStart !== undefined) {
    start = el.selectionStart
    end = el.selectionEnd
  }
  else {
    try {
      el.focus()
      let rangeEl = el.createTextRange()
      let clone = rangeEl.duplicate()

      rangeEl.moveToBookmark(document.selection.createRange().getBookmark())
      clone.setEndPoint('EndToStart', rangeEl)

      start = clone.text.length
      end = start + rangeEl.text.length
    }
    catch (e) { /* not focused or not visible */}
  }

  return {start, end}
}

class MaskInput extends React.Component {

  componentWillMount() {
    const options = {
      pattern: this.props.mask,
    }
    this.mask = new InputMask(options)
    this.inputRef = React.createRef()
  }

  getDisplayValue() {
    const value = this.mask.getValue()
    return value === this.mask.emptyValue ? '' : value
  }

  keyPress(e) {
    e.preventDefault()

    this.mask.input(e.key)
    e.target.value = this.mask.getValue()
    this.updateInputSelection()
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  keyDown(e) {
    if (e.key === 'Backspace') {
      e.preventDefault()
      this.updateMaskSelection()
      if (this.mask.backspace()) {
        e.target.value = this.mask.getValue()
        this.updateInputSelection()
        if (this.props.onChange) {
          this.props.onChange(e)
        }
      }
    }
  }

  updateMaskSelection() {
    this.mask.selection = getSelection(this.inputRef.current)
  }

  updateInputSelection() {
    const {selection} = this.mask

    try {
      if (this.inputRef.current.selectionStart !== undefined) {
        this.inputRef.current.setSelectionRange(selection.start, selection.end)
      } else {
        this.inputRef.current.focus()
        let rangeEl = this.inputRef.current.createTextRange()
        rangeEl.collapse(true)
        rangeEl.moveStart('character', selection.start)
        rangeEl.moveEnd('character', selection.end - selection.start)
        rangeEl.select()
      }
    } catch (error) {
      console.error(error)
    }
  }

  blur(e) {
    this.inputRef.current.blur()
  }

  focus(e) {
    this.updateInputSelection()
  }

  render() {
    const {mask, onChange} = this.props
    const value = this.getDisplayValue()

    return (
      <input
        className="input-mask"
        ref={this.inputRef}
        value={value}
        placeholder={mask}
        onKeyPress={e => this.keyPress(e)}
        onKeyDown={e => this.keyDown(e)}
        onBlur={e => this.blur(e)}
        onFocus={e => this.focus(e)}
        onChange={onChange}
      />
    )
  }
}

MaskInput.propTypes = {
  mask: PropTypes.string,
}

MaskInput.defaultProps = {
  mask: '',
}

export default MaskInput