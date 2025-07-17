import axios from 'axios';

export const bookSession = async ({ mentorId, title, description, scheduledDate, duration, sessionType = 'video' }, token) => {
  return axios.post(
    '/session/',
    {
      mentorId,
      title,
      description,
      scheduledDate,
      duration,
      sessionType
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
