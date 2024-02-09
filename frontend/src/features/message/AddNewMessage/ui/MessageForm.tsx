import { FC, PropsWithChildren } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button } from '@/shared/ui/Button'
import { useSendMessageMutation } from '@/features/message/AddNewMessage'
import { useTranslation } from 'react-i18next'
import { getLeoProfanityFilter } from '@/shared/leoProfanity'


interface IAddNewMessage extends PropsWithChildren {

}

export const MessageForm: FC<IAddNewMessage> = () => {
    const filter = getLeoProfanityFilter('ru')
    const [sendMessage] = useSendMessageMutation()
    const { t } = useTranslation()


    return (
        <div className='mt-auto px-5 py-3'>
            <Formik
                initialValues={{
                    message: '',
                }}
                onSubmit={async (values, formikHelpers) => {
                    sendMessage(filter.clean(values.message))
                    formikHelpers.resetForm()
                }}
            >{props => (
                <Form className='py-1 border rounded-2'>
                    <div className='input-group has-validation'>
                        <Field
                            id='message'
                            name='message'
                            aria-label={t('messageForm.ariaLabel')}
                            placeholder={t('messageForm.placeholder')}
                            type='text'
                            className='border-0 p-0 ps-2 form-control'
                        />
                        <ErrorMessage name='message' />
                        <Button
                            disabled={!props.values.message.length}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    props.handleSubmit()
                                }
                            }}
                            className='btn btn-group-vertical btn-link' type='submit'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'
                                 width='20' height='20' fill='currentColor'>
                                <path fillRule='evenodd'
                                      d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z'>
                                </path>
                            </svg>
                            <span className='visually-hidden'>t('messageForm.send')</span>
                        </Button>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    )
}