import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ name, imageUrl }) => {
    const nameInitials = name
        .match(/(\b\S)?/g)
        .join("")
        .match(/(^\S|\S$)?/g)
        .join("")
        .toUpperCase();

    return (
        <Avatar>
            <AvatarImage src={imageUrl} alt={nameInitials} />
            <AvatarFallback className="bg-primary text-white">
                {nameInitials}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;
