import React, {Dispatch, useEffect, useState} from 'react'
import {Dialog} from 'primereact/dialog'
import Input from '../../input/Input'
import Button from '../../button/Button'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {Editor as TiptapEditor} from '@tiptap/core'

type Props = {
  editor: TiptapEditor
  visible: boolean
  setVisible: Dispatch<React.SetStateAction<boolean>>
}

const LinkEditor = ({editor, visible, setVisible}: Props) => {
  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: Yup.object({
      url: Yup.string().url('Invalid URL').required('Required'),
    }),
    onSubmit: (values) => {
      editor.chain().focus().extendMarkRange('link').setLink({href: values?.url}).run()
      formik.resetForm()
      setVisible(false)
    },
  })

  const handleClose = () => {
    if (!visible) return
    setVisible(false)
    formik.resetForm()
    formik.setTouched({url: false})
  }
  return (
    <Dialog header='URL' visible={visible} style={{width: '50vw'}} onHide={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          value={formik.values.url}
          placeholder='https://...'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name='url'
        />
        {formik.touched.url && formik.errors.url && (
          <div className='text-red-500 text-[13px] mt-[10px]'>{formik.errors.url}</div>
        )}
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

export default LinkEditor
