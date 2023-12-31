import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { fetchCategories, insertProduct, uploadImageToServer } from '../services/productAction'
import { useNavigate } from 'react-router-dom'

export default function ProductFormik() {
    const [categories, setCategories] = useState([])
    const [source, setSource] = useState("")
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            title: "",
            price: 0,
            description: "",
            categoryId: 0,
            images: ["https://picsum.photos/640/640?r=801"]
        },
        validationSchema: Yup.object({
            title: Yup.string()
            .max(15, "Must be 15 character or less")
            .required("It could not be blank"),
            price: Yup.number().max(1_000_000_000, "Only up to 1 millions").required("Required"),
            description: Yup.string().required("Please write down appropriate description"),
            categoryId: Yup.number().required("Please choose category"),
            images: Yup.mixed().required("Required")
            .test('FILE_SIZE', "Too Big", (value) => value && value.size < 1024*1024)
            .test("FILE_TYPE", "Invalid", (value) => value && ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type))
        }),
        onSubmit: () => {
            console.log('on submit', formik.values)
            console.log('source', source)
            // block code execute when user insert product
            // console.log(product)
            let image = new FormData()
            image.append('file', source)
            // perform upload image first
            uploadImageToServer(image)
            .then(res => {
              // assign url image to state
              formik.values.images = [res.data.location]
              console.log('with image:', formik.values)
              // final insert product with image
              insertProduct(formik.values)
              .then(res => {
                console.log(res)
                navigate('/dashboard')
              })
            })
        }
    })

    useEffect(() => {
        fetchCategories()
        .then(res => setCategories(res))
    }, [])
    

  return (
    <section className="container mx-auto mt-32 md:w-1/2">
        <h2 className="font-extrabold md:text-5xl">Create new product</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-10">
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={formik.handleChange}
              id="title"
              value={formik.values.title}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Ex. Apple iMac 27&ldquo;"
            />
            {
                formik.errors.title ? <p className='text-red-700'>{formik.errors.title}</p> : null
            }
          </div>
          <div>
            <label
              for="brand"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Brand
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              value="Google"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Ex. Apple"
            />
          </div>
          <div>
            <label
              for="price"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              name="price"
              id="price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="$299"
            />
            {
                formik.errors.price ? <p className='text-red-700'>{formik.errors.price}</p> : null
            }
          </div>
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              onChange={formik.handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option disabled>Product Category</option>
              {
                categories.map(category => (
                    <option value={category.id}>{category.name}</option>
                ))
              }
              
            </select>
            {
                formik.errors.categoryId ? <p className='text-red-700'>{formik.errors.categoryId}</p> : null
            }
          </div>
          <div class="sm:col-span-2">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Write a description..."
            >
            </textarea>
            {
                formik.errors.description ? <p className='text-red-700'>{formik.errors.description}</p> : null
            }
          </div>
          
            <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                        {
                        formik.errors.images ? <p className='text-red-700'>{formik.errors.images}</p> : null
                        }
                    <input 
                        id="dropzone-file" type="file"
                        onChange={(e) => {
                            formik.setFieldValue("images", e.target.files[0])
                            setSource(e.target.files[0])
                        }}
                        class="hidden" />
                </label>
                
                {
                    console.log(formik.errors.images)
                }
            </div> 
            <div>
                <img 
                    src={source == "" ? formik.values.images[0] : URL.createObjectURL(source)}
                    width={250}
                />

            </div>

        </div>
        <div class="flex items-center space-x-4">
          <button
            type="submit"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create product
          </button>
          <button
            type="button"
            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <svg
              class="mr-1 -ml-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Delete
          </button>
        </div>
      </form>
    </section>
  )
}
