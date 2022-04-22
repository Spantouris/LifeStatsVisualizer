import { useState } from 'react';

export const ColorPickerComponent = (props) => {
    const { color, changeColor } = props;
    const [customColor, setCustomColor] = useState(color);

    const updateColor = (color) => {
        setCustomColor(color);
        changeColor && changeColor(color);
    }

    return <input
        style={{ marginTop: '7px' }}
        type="color"
        value={customColor}
        onChange={(val) => updateColor(val.target.value)}
    />;
}