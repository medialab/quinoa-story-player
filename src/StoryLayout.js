import React from 'react';
import ReactMarkdown from 'react-markdown';
import KeyHandler, {KEYDOWN} from 'react-key-handler';

const PresentationLayout = ({
  story
}) => {
  const onArrowUp = (e) => console.log('on arrow up');
  const onArrowDown = (e) => console.log('on arrow down');
  return (
    <section className="wrapper">
      Coucou section
      <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowUp" onKeyHandle={onArrowUp} />
      <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowDown" onKeyHandle={onArrowDown} />
    </section>
  );
};

export default PresentationLayout;

