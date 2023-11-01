import { Button, Modal } from 'flowbite-react'
import React from 'react'

export default function Modals({openModal, onCloseModal, data}) {
  return (
    <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>
            {
                data.title
            }
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {
                data.description
              }
            </p>
            <p className="mb-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
              
              ${
                data.price
              }

            </p>
            <p className="mb-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
              
              {
                data.category && data.category.name
              }

            </p>

            {/* show category name */}

          </div>
          <div className='mt-5 grid grid-cols-3 md:grid-cols-6 gap-4'>
            
            {
                data.images && data.images.map(image => (
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src={image} alt="" />
                    </div>
                ))
            }

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onCloseModal}>I accept</Button>
          <Button color="gray" onClick={() => onCloseModal}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
