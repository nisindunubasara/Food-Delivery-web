import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BACKEND_URL, CURRENCY } from '../App'

const ORDER_STATUS_OPTIONS = [
  'Order Placed',
  'Food Processing',
  'Packing',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
]

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionOrderId, setActionOrderId] = useState('')

  const normalizeOrders = (responseData) => {
    const rawOrders =
      responseData?.orders ??
      responseData?.orderList ??
      responseData?.data?.orders ??
      responseData?.data?.orderList ??
      []

    if (!Array.isArray(rawOrders)) {
      return []
    }

    return rawOrders.filter(Boolean)
  }

  const formatAddress = (info) => {
    if (!info) return '-'

    return [
      info.street,
      info.city,
      info.state,
      info.postalCode,
      info.country
    ]
      .filter(Boolean)
      .join(', ')
  }

  const formatDate = (order) => {
    const dateValue = order?.createdDate || order?.createdAt
    if (!dateValue) return '-'
    return new Date(dateValue).toLocaleString()
  }

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      setLoading(true)

      const response = await axios.get(BACKEND_URL + '/api/order/list', {
        headers: { token }
      })

      if (response.data.success) {
        setOrders(normalizeOrders(response.data))
      } else {
        toast.error(response.data.message)
        setOrders([])
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, orderStatus) => {
    if (!orderId) return

    try {
      setActionOrderId(orderId)

      const response = await axios.post(
        BACKEND_URL + '/api/order/update/' + orderId,
        { orderStatus },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchAllOrders()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setActionOrderId('')
    }
  }

  const cancelOrder = async (orderId) => {
    if (!orderId) return

    try {
      setActionOrderId(orderId)

      const response = await axios.delete(
        BACKEND_URL + '/api/order/remove/' + orderId,
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message || 'Order removed successfully')
        await fetchAllOrders()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setActionOrderId('')
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className='w-full'>
      <div className='mb-4 flex items-center justify-between gap-3'>
        <h2 className='text-xl font-semibold text-gray-800'>All Orders</h2>

        <button
          type='button'
          onClick={fetchAllOrders}
          className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer'
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className='rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500'>
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className='rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500'>
          No orders found.
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {orders.filter(Boolean).map((order, index) => {
            const deliveryInfo = order?.customerDeliveryInfo || {}
            const orderedItems = Array.isArray(order?.orderedItems)
              ? order.orderedItems.filter(Boolean)
              : []

            const orderId = order?._id || `order-${index}`
            const isBusy = actionOrderId === orderId

            return (
              <article
                key={orderId}
                className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'
              >
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]'>
                  <div className='space-y-2 text-sm text-gray-700'>
                    <p>
                      <span className='font-semibold text-gray-900'>Customer:</span>{' '}
                      {`${deliveryInfo.firstName || ''} ${deliveryInfo.lastName || ''}`.trim() || '-'}
                    </p>

                    <p>
                      <span className='font-semibold text-gray-900'>User ID:</span>{' '}
                      {order?.userId || '-'}
                    </p>

                    <p>
                      <span className='font-semibold text-gray-900'>Phone:</span>{' '}
                      {deliveryInfo.phone || '-'}
                    </p>

                    <p>
                      <span className='font-semibold text-gray-900'>Address:</span>{' '}
                      {formatAddress(deliveryInfo)}
                    </p>

                    <p>
                      <span className='font-semibold text-gray-900'>Order Date:</span>{' '}
                      {formatDate(order)}
                    </p>
                  </div>

                  <div className='space-y-2 text-sm text-gray-700'>
                    <p>
                      <span className='font-semibold text-gray-900'>Total Amount:</span>{' '}
                      {CURRENCY}{Number(order?.totalAmount || 0).toFixed(2)}
                    </p>

                    <p>
                      <span className='font-semibold text-gray-900'>Payment Method:</span>{' '}
                      {order?.paymentMethod || '-'}
                    </p>

                    <p>
                      <span className='font-semibold text-gray-900'>Payment Status:</span>{' '}
                      {order?.paymentStatus || 'Pending'}
                    </p>

                    <p>
                      <span className='font-semibold text-gray-900'>Order Status:</span>{' '}
                      {order?.orderStatus || 'Food Processing'}
                    </p>
                  </div>
                </div>

                <div className='mt-4 rounded-lg border border-gray-200'>
                  <div className='hidden grid-cols-[1.6fr_0.7fr_0.7fr] bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600 sm:grid'>
                    <p>Ordered Items</p>
                    <p>Price</p>
                    <p>Quantity</p>
                  </div>

                  <div className='divide-y divide-gray-100'>
                    {orderedItems.length > 0 ? (
                      orderedItems.map((item, itemIndex) => (
                        <div
                          key={item?.foodId || item?._id || itemIndex}
                          className='grid grid-cols-1 gap-2 px-3 py-3 text-sm text-gray-700 sm:grid-cols-[1.6fr_0.7fr_0.7fr] sm:gap-0'
                        >
                          <p className='font-medium text-gray-800'>{item?.name || '-'}</p>
                          <p>{CURRENCY}{Number(item?.price || 0).toFixed(2)}</p>
                          <p>{item?.quantity || 0}</p>
                        </div>
                      ))
                    ) : (
                      <p className='px-3 py-3 text-sm text-gray-500'>
                        No items found in this order.
                      </p>
                    )}
                  </div>
                </div>

                <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                  <div className='flex items-center gap-2'>
                    <label
                      className='text-sm font-medium text-gray-700'
                      htmlFor={`status-${orderId}`}
                    >
                      Update Status
                    </label>

                    <select
                      id={`status-${orderId}`}
                      value={order?.orderStatus || 'Food Processing'}
                      onChange={(event) => updateOrderStatus(orderId, event.target.value)}
                      disabled={isBusy}
                      className='rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500'
                    >
                      {ORDER_STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type='button'
                    disabled={isBusy || (order?.orderStatus || '') === 'Cancelled'}
                    onClick={() => cancelOrder(orderId)}
                    className='rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'
                  >
                    {isBusy ? 'Updating...' : 'Cancel Order'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Orders