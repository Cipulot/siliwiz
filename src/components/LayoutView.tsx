import { layout } from '~/model/layout';
import { toMagic } from '~/model/toMagic';
import { downloadFile } from '~/utils/download-file';
import Editor from './Editor';
import Palette from './Palette';

export default function LayoutView() {
  return (
    <>
      <Palette />
      <Editor />
      <button
        onClick={() => {
          downloadFile('siliwiz.mag', toMagic(layout));
        }}
      >
        Download magic
      </button>
      &nbsp;
      <button
        onClick={async () => {
          const start = new Date().getTime();
          const magic = toMagic(layout);
          const res = await fetch('https://siliwiz-server-73miufol2q-uc.a.run.app/magic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ magicFile: magic }),
          });
          const data = await res.json();
          downloadFile('siliwiz.spice', data.spiceFile);
          console.log('Download time:', new Date().getTime() - start, 'ms');
        }}
      >
        Download Extracted Spice
      </button>
    </>
  );
}
