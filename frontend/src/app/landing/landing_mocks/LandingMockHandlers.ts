import { http, HttpResponse } from 'msw';

export const landingHandlers = [
  http.post('*/landing/booking', async () => {
    return HttpResponse.json({
      success: true,
      message: 'Booking submitted successfully',
      data: null
    });
  }),
  
  http.post('*/landing/contact', async () => {
    return HttpResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: null
    });
  })
];
