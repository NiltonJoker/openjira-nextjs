import { ChangeEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false);

  const [inputValue, setInputValue] = useState("")
  const [touched, setTouched] = useState(false)

  const onTextFieldChange = (event : ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onCancel = () => {
    setIsAdding(false)
    setTouched(false)
    setInputValue("")
  }

  const onSave = () => {
    if(inputValue.length === 0 ) return;

    console.log({inputValue});
  }
  

  return (
    <Box sx={{ paddingX: "5px", marginBottom: 2 }}>
      {isAdding ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={() => setTouched(true)}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>

            <Button variant="text" onClick={() => onCancel()}>
              Cancelar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAdding(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
