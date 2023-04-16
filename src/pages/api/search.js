// pages/api/search.js
import axios from 'axios';

export default async function handler(req, res) {
  const { search_by, query, query_2 } = req.query;

  try {
    const backendResponse = await axios.get('https://9ec2-128-163-238-157.ngrok-free.app/search', {
      params: {
        search_by,
        query,
      },
    });

    res.status(200).json(backendResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
