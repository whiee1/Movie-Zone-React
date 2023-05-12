import { useNavigate } from "react-router-dom";

//Knapp som vid klick navigerar till tidigare sida
const Back = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="back"
      >
        <i className="fa fa-arrow-left"> </i> Back
      </button>
    </>
  );
};
export default Back;
