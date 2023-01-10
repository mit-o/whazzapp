import Image from "next/image";

const Avatar = (props) => {
  return (
    <div className={`${props.className} rounded-full`}>
      <Image
        layout="responsive"
        width="100%"
        height="100%"
        className="rounded-full object-cover"
        src={props.src}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
