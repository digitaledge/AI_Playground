/* @flow */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import c from 'classnames';
import s from './ImageGridItem.css';


const placeholder =
    'data:image/png;base64,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';

type Props = {
    src: string,
    score: Object,
    key: string,
};

const ImageGridItem = ({ src, score, key }: Props) => (
    <div className={s.imageContainer}>
        <div className={s.imageWrap}>
            <img className={s.image} src={src || placeholder} alt={key} />
        </div>

        <div className={s.sectionHeader}>
            <p>OPEN NSFW</p>
        </div>
        <div className={s.infoWrap}>
            <p>
                <span className={s.percents}>
                    {(score.nsfw.score * 100).toFixed()}%
                </span>
                <span> / {score.nsfw.rating}</span>
            </p>

        </div>
        <div className={s.sectionHeader}>
            <p>INCEPTION5H</p>
        </div>
        <div className={s.infoWrap}>
            {score.classification.map((item, idx) => (
                <p key={idx}>
                    <span className={s.percents}>{(item.score * 100).toFixed()}%</span>
                    <span> - {item.className}</span>
                </p>
            ))}
        </div>
    </div>
);

export default withStyles(s)(ImageGridItem);
