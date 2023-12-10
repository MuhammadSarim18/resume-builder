import React, { useState, useEffect, ChangeEvent } from 'react';

interface ProfileData {
    name: string;
    professionalTitle: string;
    email: string;
    github: string;
    website: string;
}

const EditableField: React.FC<{
    label: string;
    name: keyof ProfileData;
    value: string;
    className: string
    onSave: (field: keyof ProfileData, value: string) => void;
}> = ({ label, name, value, className, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [fieldValue, setFieldValue] = useState(value);

    const handleFocus = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onSave(name, fieldValue);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFieldValue(e.target.value);
    };

    return (
        <div className="mb-4">
            {/* <label className="block mb-1 text-sm font-semibold">{label}</label> */}
            {isEditing ? (
                <input
                    type="text"
                    name={name}
                    value={fieldValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={className}
                />
            ) : (
                <div
                    onClick={handleFocus}
                    className="cursor-pointer border-b-2 border-gray-300 hover:border-transparent"
                >
                    {value}
                </div>
            )
            }
        </div>
    );


}
export const Profile: React.FC = () => {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: 'Jonathan Lewis',
        professionalTitle: 'Web Developer',
        email: 'support@resumewind.com',
        github: 'github.com/username',
        website: 'resumewind.com',
    });

    const saveToLocalStorage = (field: keyof ProfileData, value: string) => {
        const updatedProfileData = { ...profileData, [field]: value };
        setProfileData(updatedProfileData);
        localStorage.setItem('profileData', JSON.stringify(updatedProfileData));
    };

    useEffect(() => {
        const savedProfileData = localStorage.getItem('profileData');
        if (savedProfileData) {
            setProfileData(JSON.parse(savedProfileData));
        }
    }, []);

    return (
        <div className="relative">
            <h1>
                <EditableField
                    label="Name"
                    name="name"
                    value={profileData.name}
                    onSave={saveToLocalStorage}
                    className={''} />
            </h1>
            <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-10 xl:gap-24 z-10">
                <EditableField
                    label="Professional Title"
                    name="professionalTitle"
                    value={profileData.professionalTitle}
                    onSave={saveToLocalStorage} className={''} />
            </div>

            <EditableField
                label="Email"
                name="email"
                value={profileData.email}
                onSave={saveToLocalStorage} className={''} />
            <EditableField
                label="GitHub"
                name="github"
                value={profileData.github}
                onSave={saveToLocalStorage} className={''} />
            <EditableField
                label="Website"
                name="website"
                value={profileData.website}
                onSave={saveToLocalStorage} className={''} />
        </div>
    );
};

