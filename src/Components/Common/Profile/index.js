import React, {useEffect, useRef, useState} from "react";
import {BiEdit} from "react-icons/bi";
import {BsTrash} from "react-icons/bs";
import {IoMdClose} from "react-icons/io";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {replaceNullWithEmptyString} from "../../../utils/helpers";
import Avatar from "../../../Assets/images/no-profile-img.webp";
import {axiosClientForm, axiosClientWithHeaders} from "../../../libs/axiosClient";
import {setUserInfo} from "../../../Redux/slices/userSlice";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./style.scss";

function Profile() {
    const user = useSelector((store) => store.user.user);
    const [state, setState] = useState({});
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cropperFile, setCropperFile] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [profileImageFileUrl, setProfileImageFileUrl] = useState("");

    const fileRef = useRef(null);
    const cropperRef = useRef(null);
    const dispatch = useDispatch();

    const handleSetImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    const image = reader.result;
                    setCropperFile(image);
                }
            };
            reader.readAsDataURL(file);
        }
        setCropModalOpen(true);
    };

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const clearFile = () => {
        fileRef.current.value = null;
        setProfileImageFile(null);
        setProfileImageFileUrl("");
    };

    const getMyData = async () => {
        try {
            const resp = await axiosClientWithHeaders.get("/users/my-profile/");
            const respObj = {...resp.data.data};
            dispatch(setUserInfo(respObj));
        } catch (err) {
            console.error(err);
        }
    };

    const updateUserProfile = async () => {
        setLoading(true);
        const formData = new FormData();
        for (let [key, value] of Object.entries(state)) {
            if (details.includes(key)) {
                formData.append(key, value);
            }
        }
        if (profileImageFileUrl) {
            formData.append("profile_image", profileImageFile);
        }
        try {
            await axiosClientForm.put("/users/update-my-profile/", formData);
            toast.success("Profile updated successfully");
            getMyData();
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const details = ["first_name", "last_name", "organization", "bio", "links"];

    const getImage = () => {
        if (profileImageFileUrl) {
            return profileImageFileUrl;
        } else {
            if (state.profile_image) {
                return `${state.profile_image}`;
            } else {
                return Avatar;
            }
        }
    };

    const onCrop = () => {
        const filename = fileRef.current.value.split("\\");
        const cropper = cropperRef.current?.cropper;
        const croppedCanvas = cropper.getCroppedCanvas();
        if (croppedCanvas) {
            // Convert the cropped canvas to a Blob object
            croppedCanvas.toBlob((blob) => {
                // Create a temporary URL for the cropped image
                const file = new File(
                    [blob],
                    filename.length ? filename[filename.length - 1] : 'croppedImage.jpg',
                    {type: 'image/jpeg'}
                );
                setProfileImageFile(file);
            });
        }

    };

    const cropImage = () => {
        const cropper = cropperRef.current?.cropper;
        const croppedCanvas = cropper.getCroppedCanvas();
        if (croppedCanvas) {
            // Convert the cropped canvas to a Blob object
            croppedCanvas.toBlob((blob) => {
                // Create a temporary URL for the cropped image
                const croppedImageUrl = URL.createObjectURL(blob);
                setProfileImageFileUrl(croppedImageUrl);
            });
        }
        setCropModalOpen(false);
    }

    useEffect(() => {
        getMyData();
    }, []);

    useEffect(() => {
        setState(replaceNullWithEmptyString(user));
    }, [user]);

    return (
        <>
            <div className="profile flex justify-center">
                <div className="bg-[#fff] w-[55%] py-3 px-4">
                    <div className="flex items-center justify-between">
                        <h1>Edit Profile</h1>
                        <div className="flex">
              <span>
                <img
                    src={getImage()}
                    className="w-[120px] h-[120px] rounded-full"
                    alt=""
                />
              </span>
                            {profileImageFileUrl ? (
                                <span className="ml-[-30px] cursor-pointer flex items-end">
                  <BsTrash size={25} fill="red" onClick={clearFile}/>
                </span>
                            ) : (
                                <span className="ml-[-30px] cursor-pointer flex items-end">
                  <BiEdit size={25} onClick={() => fileRef.current.click()}/>
                </span>
                            )}
                        </div>
                    </div>
                    <input onChange={handleSetImage} ref={fileRef} type="file" hidden/>
                    <div className="flex w-full flex-wrap mt-8">
                        <div className="flex m-2 w-[40%] flex-col">
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                value={state.first_name}
                                onChange={handleChange}
                                className="border p-2"
                            />
                        </div>
                        <div className="flex m-2 w-[40%] flex-col">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={state.last_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="border p-2"
                            />
                        </div>
                    </div>
                    <div className="flex mx-2 w-full flex-col mt-8">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border p-2"
                            disabled
                        />
                    </div>

                    <div className="flex w-full flex-wrap mt-8">
                        <div className="flex w-[40%] m-2 flex-col">
                            <label>Mobile Number </label>
                            <div className="border flex mobile-input">
                                <div className="flex w-[110px] p-2 pointer-events-none bg-gray-200">
                                    <img
                                        src={state.country__flag}
                                        className="w-[23px] h-[22px]"
                                        alt=""
                                    />
                                    <span className="ml-1">{state.country__calling_code}</span>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="tel"
                                        name="mobile_number"
                                        value={state.mobile_number}
                                        onChange={handleChange}
                                        placeholder="Enter mobile number"
                                        className="mt-0 w-full p-2"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex w-[40%] m-2 flex-col">
                            <label>Country</label>
                            <input
                                className="mt-2 border p-2"
                                name="country_id"
                                value={state.country__name}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex mx-2 w-full flex-col mt-8">
                        <label>Organization</label>
                        <input
                            type="text"
                            name="organization"
                            value={state.organization}
                            onChange={handleChange}
                            placeholder="Enter organization"
                            className="border p-2"
                        />
                    </div>
                    <div className="flex mx-2 w-full flex-col mt-8">
                        <label>Bio</label>
                        <textarea
                            placeholder="Write here..."
                            rows={3}
                            name="bio"
                            value={state.bio}
                            onChange={handleChange}
                            className="border p-2"
                        />
                    </div>
                    <div className="flex mx-2 w-full flex-col mt-8">
                        <label>
                            Links <span className="text-[#8d8c8c]">(comma separated)</span>
                        </label>
                        <textarea
                            placeholder="eg: https://google.com, https://youtube.com"
                            rows={3}
                            name="links"
                            value={state.links}
                            onChange={handleChange}
                            className="border p-2"
                        />
                    </div>
                    <div className="mt-3 flex justify-center">
                        <button
                            className="profile-save py-2 px-4 text-[#fff]"
                            onClick={updateUserProfile}
                        >
                            {loading ? "Loading..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
            {cropModalOpen && (
                <div className="modal-bg fixed flex justify-center items-center top-0 bottom-0 left-0 right-0">
                    <div className="bg-[#fff] border-lg p-4 max-w-[400px]">
                        <div className="flex justify-between">
                            <h1 className="mb-3">Crop Image</h1>
                            <div onClick={() => setCropModalOpen(false)}
                                 className="bg-gray-200 cursor-pointer w-[30px] h-[30px] flex items-center justify-center rounded-full">
                                <IoMdClose/></div>
                        </div>
                        <Cropper
                            src={cropperFile}
                            style={{height: 400, width: "100%"}}
                            initialAspectRatio={16 / 9}
                            guides={false}
                            crop={onCrop}
                            ref={cropperRef}
                        />
                        <div className="flex justify-center">
                            <button
                                className="mt-3 profile-save py-2 px-3"
                                onClick={cropImage}
                            >
                                Crop
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;
