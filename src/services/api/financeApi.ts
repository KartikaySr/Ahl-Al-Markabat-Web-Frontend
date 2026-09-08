import { apiRequest } from '../apiClient';

export interface CreateInvoiceDto {
  serviceRequestId: string;
  amount: number;
}

export const financeApi = {
  createInvoice: async (dto: CreateInvoiceDto) => {
    return apiRequest('/finance/invoices', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  },

  markPaidOffline: async (invoiceId: string) => {
    return apiRequest('/finance/invoices/' + invoiceId + '/pay-offline', {
      method: 'PATCH',
    });
  },

  createPaymentIntent: async (invoiceId: string) => {
    return apiRequest('/finance/invoices/' + invoiceId + '/pay-online', {
      method: 'POST',
    });
  },

  listPayouts: async (businessId: string) => {
    return apiRequest('/finance/payouts/business/' + businessId, {
      method: 'GET',
    });
  },
};
