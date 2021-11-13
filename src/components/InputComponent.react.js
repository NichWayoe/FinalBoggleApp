import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React from "react";
import Button from "react-bootstrap/Button";

export function InputComponent(props): React.MixedElement | Null {
  const { handleSubmit, setWord } = props;
  return (
    <div>
      <InputGroup className="mb-3">
        <Button
          variant="primary"
          id="button-addon1"
          type="submit"
          onClick={handleSubmit}
        >
          submit
        </Button>
        <FormControl
          name="word"
          onChange={(e) => setWord(e.target.value)}
        />
      </InputGroup>
    </div>
  );
}
export default InputComponent;
