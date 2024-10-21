import {Dialog} from 'primereact/dialog'
import React, {Dispatch} from 'react'
import {Editor as TiptapEditor} from '@tiptap/core'
import * as Yup from 'yup'
import Button from '../../../button/Button'
import {useFormik} from 'formik'

type Props = {
  editor: TiptapEditor
  visible: boolean
  setVisible: Dispatch<React.SetStateAction<boolean>>
}

const ModelImage = ({editor, visible, setVisible}: Props) => {
  const {resetForm, handleSubmit} = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: Yup.object({
      url: Yup.string().url('Invalid URL').required('Required'),
    }),
    onSubmit: (values) => {
      editor.chain().focus().extendMarkRange('link').setLink({href: values?.url}).run()
      resetForm()
      setVisible(false)
    },
  })

  const handleClose = () => {
    if (!visible) return
    setVisible(false)
    // formik.resetForm()
    // formik.setTouched({url: false})
  }
  return (
    <Dialog header='Add image' visible={visible} style={{width: '50vw'}} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
        <div className='flex border-[1px]  border-top  border-r-0 border-b-0 border-l-0 pt-[30px] '>
          <div></div>
        </div>
        <div className='pt-[30px] flex justify-end w-[100%] gap-[12px]'>
          <Button type='button' colorButton='white' onClick={handleClose}>
            Cancel
          </Button>
          <Button type='submit'>Apply</Button>
        </div>
      </form>
    </Dialog>
  )
}

export default ModelImage
