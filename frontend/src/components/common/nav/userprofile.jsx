import ProfileSettings from '@/features/mentee/ProfileSettings'
import MentorProfileSettings from '@/features/mentor/mentorprofiledit'
import React from 'react'
import { useSelector } from 'react-redux'

function Userprofile() {
  const user = useSelector((state) => state.user.user)
   const theme = useSelector((state) => state.theme.mode)
    const isDarkMode = theme === "light"

  if (!user) {
    return <div className="p-4 text-center text-gray-500">Loading user profile...</div>
  }

  return (
    <div className={isDarkMode?" bg-[#111111]":"bg-white"}>
      {user.role === "mentee" ?   <ProfileSettings
          isOpen={open}
          
          
          profileData={{
            ...user,
            interests: user.interests || [], // fallback if interests is undefined
          }}
          isDarkMode={isDarkMode}
          textClass="text-black"
          mutedTextClass="text-gray-500"
          cardBgClass="bg-white"
          borderClass="border-gray-200"
        /> : <MentorProfileSettings
        isOpen={open}
          
          
          profileData={{
            ...user,
            interests: user.interests || [], // fallback if interests is undefined
          }}
          isDarkMode={isDarkMode}
          textClass="text-black"
          mutedTextClass="text-gray-500"
          cardBgClass="bg-white"
          borderClass="border-gray-200"
        />}
    </div>
  )
}

export default Userprofile
