"use client"
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import AuthStore from "@/store/AuthStore";
import { BiEditAlt } from "react-icons/bi";
import DateFormater from "@/utils/DateFormater";
import TotalTodos from "@/components/TotalTodos";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Profile({onClose}){
    const router  = useRouter();
    const {user } = AuthStore()
    const [loading,setLoading] = useState(false);
    const [uploading,setUploading] = useState(false);
    const [saving,setSaving] = useState(false);

    const [profile,setProfile] = useState({
        name: '',
        email: '',
        role: '',
        avatar_url: '',
    });

    const loadProfile = async () => {
        try {
            const {data,error} = await supabase
            .from('profiles')
            .select('name , email , role , avatar_url ')
            .eq('id',user.id)
            .single();

            if(error) throw error;

            setProfile({
                name: data?.name || '',
                email: data?.email || '',
                role: data?.role || '',
                avatar_url: data?.avatar_url || ''
            });
        } catch (error) {
            console.log('Error loading profile',error);    
        }finally{
            setLoading(false)
        }
    }


    const uploadAvatar = async (e) => {
        try {
            setUploading(true);

            if(!e.target.files || !e.target.files.length === 0 ){
                return 
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;


            //upload image to supabase
            const {error: uploadError} = await supabase.storage
            .from('profiles')
            .upload(filePath,file,{upsert: true});

            if(uploadError){
                console.error('Storage upload error:', uploadError);
                throw uploadError
            }

            //get public url
            const {data: {publicUrl}} = await  supabase.storage
            .from('profiles')
            .getPublicUrl(filePath);

            //update profile 
            const {error: updateError} = await supabase
            .from('profiles')
            .update({avatar_url: publicUrl})
            .eq('id',user.id);

            if(updateError) throw updateError;

            // await refetchProfile()

            setProfile({ ...profile, avatar_url: publicUrl });
            alert('Avatar updated successfully!');


        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Error uploading avatar. Please try again.');
        }finally{
            setUploading(false)
        }
    }


    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            setSaving(true)

            const {error} = await supabase
            .from('profiles')
            .update({
                name: profile.name,
                email: profile.email
            })
            .eq('id',user.id);

            if(error) throw error

            alert('Profile Updated Successfully');            
            
        } catch (error) {
            console.log('Error updating profile',error);
            alert('Error updating profile. Please try again.');
        }finally{
            setSaving(false)
        }
    }


    useEffect(() => {
        if(user?.id){
            loadProfile()
        }
    },[user])



    return(
        <div className="absolute right-0 top-0 bottom-0 h-full bg-white ring-1 ring-black/8 p-5 w-1/3 space-y-5">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold ">Profile</p>
                <button 
                    onClick={onClose}
                    className="text-xl text-gray-400 font-semibold "
                >
                    X
                </button>
            </div>

            <div className="border border-gray-400 p-5 rounded-xl">
               <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="border  size-20 rounded-full">
                        {profile.avatar_url ? (
                            <img 
                                src={profile.avatar_url}
                                alt='Profile Image'
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                                {profile.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                        )}
                    </div>

                    <div className="absolute top-0 left-15 bg-purple-300 rounded-full p-1" >
                        <label>
                            <BiEditAlt className="text-purple-500" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={uploadAvatar}
                                disabled={uploading}
                                 className="hidden"
                            />
                        </label>
                    </div>
                </div>


                <div className="space-y-3">
                    <p className="bg-yellow-100 text-yellow-600 w-1/2 px-1 py-2 rounded-3xl flex justify-center items-center text-md">
                        {profile.role ? (profile.role === "super_user" && 'Super User') : 'Role'}
                    </p>
                    <p className="text-gray-400">Joined On : {DateFormater(user.created_at)}</p>
                </div>
              </div>

              <form onSubmit={updateProfile} className="flex flex-col gap-3 mt-5">
                <label className="flex flex-col items-start gap-3">
                    <p className="text-md font-semibold">Name</p>
                    <input 
                        placeholder="Write name"
                        className="ring-1 ring-black/8 text-md  px-2 py-3 rounded-lg w-full"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile,name: e.target.value})}
                    />
                </label>
                <label className="flex flex-col items-start gap-3">
                    <p className="text-md font-semibold">Email</p>
                    <input 
                        className="ring-1 ring-black/8 text-md  px-2 py-3 rounded-lg w-full"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile,email: e.target.value})}
                    />
                </label>

                <button 
                    type="submit"
                    disabled={saving}
                    className="bg-green-100 text-green-700 w-full py-3 rounded-lg text-md font-semibold"
                >
                     {saving ? 'Updating...' : 'Update Profile'}
                </button>
              </form>

              <TotalTodos profile/>
            </div>

            <button 
                className="flex items-center justify-center w-full gap-3 font-semibold" 
                onClick={() => router.push('/')}
            >
                <IoIosLogOut className="text-gray-400"/>
                Logout
            </button>
        </div>
    )
}



