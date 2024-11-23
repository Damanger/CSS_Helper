import React, { useState, useEffect } from 'react';
import { EditorState } from "@codemirror/state";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from '@uiw/codemirror-theme-dracula';
import { html } from "@codemirror/lang-html";
import Style from '../css/glassmorphism.module.css';

const Glassmorphism = () => {
    // Estados para los valores de los controles
    const [blur, setBlur] = useState(12.5);
    const [opacity, setOpacity] = useState(50);
    const [saturation, setSaturation] = useState(100);
    const [color, setColor] = useState("#112030");
    const [color2, setColor2] = useState("#33ccff");
    const [color3, setColor3] = useState("#ff99cc");
    const [backgroundType, setBackgroundType] = useState("image");
    const [backgroundUrl, setBackgroundUrl] = useState("https://images.pexels.com/photos/41953/earth-blue-planet-globe-planet-41953.jpeg?auto=compress&cs=tinysrgb&w=2048&h=2048&dpr=1");

    // Estado para la visibilidad de los tooltips
    const [tooltipVisible, setTooltipVisible] = useState(false);

    // Funciones para actualizar los valores de los controles
    const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => setBlur(Number(e.target.value));
    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => setOpacity(Number(e.target.value));
    const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => setSaturation(Number(e.target.value));
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value);
    const handleColor2Change = (e: React.ChangeEvent<HTMLInputElement>) => setColor2(e.target.value);
    const handleColor3Change = (e: React.ChangeEvent<HTMLInputElement>) => setColor3(e.target.value);
    const handleBackgroundUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setBackgroundUrl(e.target.value);
    const handleBackgroundTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setBackgroundType(e.target.value);

    // Función para mostrar el tooltip
    const handleMouseDown = () => setTooltipVisible(true);

    // Función para ocultar el tooltip
    const handleMouseUp = () => setTooltipVisible(false);

    const [code, setCode] = useState("");

    useEffect(() => {
        const updatedCode = `<div class="backgroundCard" \n\tstyle="${
            backgroundType === "image"
                ? `background-image: url('${backgroundUrl}');\n\t`
                : backgroundType === "gradient"
                ? `background-image: linear-gradient(to top right, ${color2}, ${color3});\n\t`
                : `background-color: ${color2};\n\t`
        }background-position: center; background-size: cover; background-repeat: no-repeat;\n\twidth: 25rem; height: 25rem; display: flex; justify-content: center; align-items: center;\n\tborder-radius: 25px; border: 1px solid rgb(255, 255, 255);">
\n\t<div class="card" style="backdrop-filter: blur(${blur}px) saturate(${saturation}%);\n\t\tbackground-color: rgba(${parseInt(
            color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity / 100}); width: 190px; height: 254px;\n\t\tmargin: 0 auto; border-radius: 8px; z-index: 1;">
        
        <div class="tools" style="display: flex; align-items: center; padding: 9px;">
                
            <div class="circle" style="padding: 0 4px;">
                <span class="redBox" style="display: inline-block; align-items: center;\n\t\t\t\t\t\twidth: 10px; height: 10px; padding: 1px; border-radius: 50%; background-color: #ff605c;">
                </span>
            </div>

            <div class="circle" style="padding: 0 4px;">
                <span class="yellowBox" style="display: inline-block; align-items: center;\n\t\t\t\t\t\twidth: 10px; height: 10px; padding: 1px; border-radius: 50%; background-color: #ffbd44;">
                </span>
            </div>
            
            <div class="circle" style="padding: 0 4px;">
                <span class="greenBox" style="display: inline-block; align-items: center;\n\t\t\t\t\t\twidth: 10px; height: 10px; padding: 1px; border-radius: 50%; background-color: #00ca4e;">
                </span>
            </div>
        </div>
    </div>
</div>`;
        setCode(updatedCode);
    }, [blur, opacity, saturation, color, color2, color3, backgroundType, backgroundUrl]);

    return (
        <div className={Style.outerContainer}>
            <h1>Glassmorphism CSS Generator</h1>
            <div className={Style.container}>
                <div className={Style.glassBoxVertical}>
                    {backgroundType === "image" && (
                        <div className={Style.backgroundInput}>
                            <p>Background URL</p>
                            <input
                                type="text"
                                value={backgroundUrl}
                                onChange={handleBackgroundUrlChange}
                                placeholder="Introduce una URL de imagen"
                            />
                        </div>
                    )}
                    {backgroundType === "solid" && (
                        <div className={Style.backgroundInput}>
                            <p>Background Color</p>
                            <input type="color" value={color2} onChange={handleColor2Change} />
                        </div>
                    )}
                    {backgroundType === "gradient" && (
                        <div className={Style.backgroundInput}>
                            <p>Background Colors</p>
                            <input type="color" value={color2} onChange={handleColor2Change} />
                            <input type="color" value={color3} onChange={handleColor3Change} />
                        </div>
                    )}
                    <div className={Style.backgroundInput}>
                        <p>Background Type</p>
                        <select value={backgroundType} onChange={handleBackgroundTypeChange}>
                            <option value="image">Image</option>
                            <option value="gradient">Gradient</option>
                            <option value="solid">Solid</option>
                        </select>
                    </div>
                    <div className={Style.backgroundInput}>
                        <p>Color</p>
                        <input type="color" value={color} onChange={handleColorChange} />
                    </div>
                    <div className={Style.backgroundInput}>
                        <p>Blur Value</p>
                        <div className={Style.rangeWrapper}>
                            <input
                                type="range"
                                min="0"
                                max="25"
                                step="0.1"
                                value={blur}
                                onChange={handleBlurChange}
                                onInput={(e) => setBlur(Number((e.target as HTMLInputElement).value))}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                            />
                            {tooltipVisible && (
                                <div className={Style.tooltip} style={{ left: `${(blur / 25) * 100}%` }}>
                                    {blur}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={Style.backgroundInput}>
                        <p>Opacity</p>
                        <div className={Style.rangeWrapper}>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={opacity}
                                onChange={handleOpacityChange}
                                onInput={(e) => setOpacity(Number((e.target as HTMLInputElement).value))}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                            />
                            {tooltipVisible && (
                                <div className={Style.tooltip} style={{ left: `${(opacity / 100) * 100}%` }}>
                                    {opacity}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={Style.backgroundInput}>
                        <p>Saturation</p>
                        <div className={Style.rangeWrapper}>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                step="1"
                                value={saturation}
                                onChange={handleSaturationChange}
                                onInput={(e) => setSaturation(Number((e.target as HTMLInputElement).value))}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                            />
                            {tooltipVisible && (
                                <div className={Style.tooltip} style={{ left: `${(saturation / 200) * 100}%` }}>
                                    {saturation}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={Style.horizontalContainer}>
                    <div className={Style.glassBoxHorizontal}>
                        <div className={Style.backgroundCard} style={{
                            backgroundImage: backgroundType === "image" ? `url(${backgroundUrl})` :
                                backgroundType === "gradient" ? `linear-gradient(to top right, ${color2}, ${color3})` : undefined,
                            backgroundColor: backgroundType === "solid" ? color2 : undefined,
                        }}>
                            <div
                                className={Style.card}
                                style={{
                                    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                                    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                                    backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity / 100})`
                                }}
                            >
                                <div className={Style.tools}>
                                    <div className={Style.circle}>
                                        <span className={Style.redBox}></span>
                                    </div>
                                    <div className={Style.circle}>
                                        <span className={Style.yellowBox}></span>
                                    </div>
                                    <div className={Style.circle}>
                                        <span className={Style.greenBox}></span>
                                    </div>
                                </div>
                                <div className={Style.cardContent}></div>
                            </div>
                        </div>
                    </div>
                    <div className={Style.glassBoxHorizontal}>
                        <h2>HTML</h2>
                        <div className={Style.codeSection}>
                            <CodeMirror
                                value={code}
                                extensions={[
                                    html(),
                                    EditorState.readOnly.of(true)
                                ]}
                                theme={dracula}
                                basicSetup={{
                                    lineNumbers: true,
                                    foldGutter: true, 
                                }}
                                className={Style.codeMirror}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Glassmorphism;
