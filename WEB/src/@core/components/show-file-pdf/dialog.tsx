import React, { useState } from 'react'
import { Dialog, DialogContent, Slide, AppBar, Toolbar, Typography, Box } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import CloseIcon from '@mui/icons-material/Close'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='left' ref={ref} {...props} />
})

interface DialogControlProps {
  children: (
    openDialogs: (content: React.ReactNode, title: React.ReactNode) => void,
    closeDialogs: () => void
  ) => React.ReactNode
}

const DialogControlShowPDF = ({ children }: DialogControlProps) => {
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null)
  const [dialogTitle, setDialogTitle] = useState<React.ReactNode>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openDialogs = (content: React.ReactNode, title: React.ReactNode) => {
    setDialogContent(content)
    setDialogTitle(title)
    setIsOpen(true)
  }

  const closeDialogs = () => {
    setDialogContent(null)
    setDialogTitle(null)
    setIsOpen(false)
  }

  return (
    <Box>
      {children(openDialogs, closeDialogs)}
      <Dialog
        open={isOpen}
        onClose={closeDialogs}
        fullScreen
        className='DialogControlShowPDF'
        TransitionComponent={Transition}
        sx={{ zIndex: 1201 }}>
        {dialogContent && (
          <Box>
            <AppBar sx={{ position: 'sticky', top: 0, zIndex: 1201 }}>
              <Toolbar>
                <Typography sx={{ ml: 2, flex: 1, color: `#fff` }} variant='h6' component='div'>
                  {dialogTitle}
                </Typography>
                <CloseIcon className='btn' onClick={closeDialogs} />
              </Toolbar>
            </AppBar>
            <DialogContent sx={{ p: 0, pt: 0, width: { xs: '100vw', md: '65vw' } }}>{dialogContent}</DialogContent>
          </Box>
        )}
      </Dialog>
    </Box>
  )
}

export default DialogControlShowPDF
