import { VariantType, useSnackbar } from 'notistack'

import { customErrorName } from 'types/errors'

import { timerStore } from 'stores/timerStore'

type PushMessageSnackbarParams = {
  message: string
  messageType?: VariantType
}

type PushErrorSnackbarParams = {
  error: Error
  penalty?: number
}

export const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar()

  const pushMessageSnackbar = ({ message, messageType }: PushMessageSnackbarParams) => {
    enqueueSnackbar(message, {
      variant: messageType ?? 'error',
      autoHideDuration: 3000,
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    })
  }

  const pushErrorSnackbar = ({ error, penalty: penaltyParam }: PushErrorSnackbarParams) => {
    let errorMsg = ''
    if (customErrorName.has(error.name) || penaltyParam) {
      const penalty = penaltyParam ?? 10
      errorMsg = `${error.message} Penalty ${timerStore.timer > timerStore.timeLimit ? '+' : '-'}${penalty} second`
      timerStore.addPenalty(penalty)
    } else {
      errorMsg = 'Something went wrong, please contact an admin.'
    }

    enqueueSnackbar(errorMsg, {
      variant: 'error',
      autoHideDuration: 3000,
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    })
  }
  return { pushMessageSnackbar, pushErrorSnackbar }
}
