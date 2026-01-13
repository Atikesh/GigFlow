import api from "./api";

const bidApi = {
  getBidsByGig: async (gigId) => {
    const res = await api.get(`/bids/${gigId}`);
    return res.data;
  },

  submitBid: async (data) => {
    const res = await api.post(`/bids`, data);
    return res.data;
  },

  hireBidder: async (bidId) => {
    const res = await api.patch(`/bids/${bidId}/hire`);
    return res.data;
  }
};

export default bidApi;
