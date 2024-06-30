import React, { useRef, useState } from 'react';
import Editor from './editor';
import Quill from "quill";
import "quill/dist/quill.core.css";

const Delta = Quill.import('delta');

const App = () => {
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();
    const [readOnly, setReadOnly] = useState(false);
    const [html, setHTML] = useState('');

    const quillRef = useRef();

    console.log(html)

    return (
        <div>
            <Editor
                ref={quillRef}
                readOnly={readOnly}
                defaultValue={new Delta()
                    .insert('Hello')
                    .insert('\n', { header: 1 })
                    .insert('Some ')
                    .insert('initial', { bold: true })
                    .insert(' ')
                    .insert('content', { underline: true })
                    .insert('\n')}
                onSelectionChange={setRange}
                onTextChange={setLastChange}
                getSemanticHTML={setHTML}
            />
            <div className="controls">
                <label>
                    Read Only:{' '}
                    <input
                        type="checkbox"
                        value={readOnly}
                        onChange={(e) => setReadOnly(e.target.checked)}
                    />
                </label>
                <button
                    className="controls-right"
                    type="button"
                    onClick={() => {
                        alert(quillRef.current?.getLength());
                    }}
                >
                    Get Content Length
                </button>
            </div>
            <div className="state">
                <div className="state-title">Current Range:</div>
                {range ? JSON.stringify(range) : 'Empty'}
            </div>
            <div className="state">
                <div className="state-title">Last Change:</div>
                {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
            </div>
        </div>
    );
};

export default App;