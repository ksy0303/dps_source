const Item = ({ text }) => {
    return <p>
      {text.split("<br>").map((txt) => (
          <>
            {txt}
            <br />
          </>
        ))}
    </p>;
};

const CustomHeader = (props) => {
    return ( 
        <span className="custom-headercell"> <Item text={props.displayName} /></span>
    );
};

export default CustomHeader;

