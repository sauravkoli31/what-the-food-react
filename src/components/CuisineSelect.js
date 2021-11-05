import React, {useRef} from "react";
import { useTheme } from '@mui/material/styles';
import CardView from "./CardView";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { useSelector, useDispatch } from "react-redux";
import { setCuisineSelect } from "../redux/userData";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, data, theme) {
  return {
    fontWeight:
      data.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
    color:
    data.indexOf(name) === -1 ? "black":"white",
    backgroundColor: data.indexOf(name) === -1 ? "":"#6da7f2"
  };
}

function CuisineSelect() {
  const theme = useTheme();
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(setCuisineSelect({
      "cuisineSelect": value
    }))
  };

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <div>
      <CardView
      title="Cuisine"
      description="What cuisine do you have in mind?"
      backgroundColor={userData?.cuisine && "rgba(255,255,255,0.85)"}
      >
        <FormControl sx={{ m: 1, width: "100%" }} className="curved-edges">
          <InputLabel id="multiple-chip-label">{userData?.cuisine ? "Select Cuisines" : "Please wait"}</InputLabel>
          <Select
          ref={myRef}
          onLoad={executeScroll}
            labelId="multiple-chip-label"
            id="multiple-chip"
            multiple
            sx={{
              borderRadius: "6px",
            }}
            disabled={!(userData?.cuisine?.length > 0)}
            value={userData?.cuisineSelect}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.3 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {userData?.cuisine?.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, userData.cuisineSelect, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardView>
    </div>
  );
}

export default CuisineSelect;
