'use client'

import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
} from 'react-aria-components'

export const TweetDialog = () => {
  const [text, setText] = useState('')
  const [warning, setWarning] = useState('')

  const isKanji = (char) => {
    return /[\u4E00-\u9FFF]/.test(char)
  }

  const isAllowedPunctuation = (char) => {
    return /[、。！？．，：；「」『』（）［］【】]/.test(char)
  }

  const isValidChar = (char) => {
    return isKanji(char) || isAllowedPunctuation(char) || char === ' '
  }

  const hasInvalidChars = (text) => {
    return text.split('').some((char) => !isValidChar(char))
  }

  const handleInput = (value) => {
    setText(value)
    if (hasInvalidChars(value)) {
      setWarning('漢検不通過')
    } else {
      setWarning('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text.trim()) {
      return
    }

    if (hasInvalidChars(text)) {
      setWarning('漢検不通過')
      return
    }

    fetch('/api/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: text }),
    })

    setText('')
    setWarning('')
  }

  return (
    <DialogTrigger>
      <Button className='w-full p-2 m-5 px-4 text-white font-bold bg-sky-500 rounded-full'>
        投稿
      </Button>
      <Modal className='fixed inset-0 flex items-center justify-center bg-black/50'>
        <Dialog className='w-full max-w-md bg-white rounded-lg'>
          {({ close }) => (
            <form
              onSubmit={(e) => {
                if (!hasInvalidChars(text)) {
                  handleSubmit(e)
                  close()
                } else {
                  handleSubmit(e)
                }
              }}
              className='p-4'
            >
              <Heading slot='title' className='text-xl font-bold mb-4'>
                投稿作成
              </Heading>

              <TextField autoFocus value={text} onChange={handleInput}>
                <Label className='sr-only'>内容</Label>
                <Input
                  className={`w-full h-24 p-2 border rounded-lg resize-none ${
                    warning ? 'border-yellow-500' : ''
                  }`}
                />
              </TextField>

              {warning && (
                <p
                  className={`mt-2 text-sm ${
                    warning.startsWith('投稿失敗')
                      ? 'text-red-500'
                      : 'text-yellow-600'
                  }`}
                >
                  {warning}
                </p>
              )}

              <div className='mt-4 flex justify-end gap-2'>
                <Button
                  onPress={close}
                  type='button'
                  className='px-4 py-2 text-gray-600'
                >
                  取消
                </Button>
                <Button
                  type='submit'
                  className='px-4 py-2 bg-sky-500 text-white font-bold rounded-full'
                  isDisabled={!text.trim()}
                >
                  投稿
                </Button>
              </div>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}
