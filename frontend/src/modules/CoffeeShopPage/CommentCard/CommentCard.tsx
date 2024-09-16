/* eslint-disable max-len */
import likeIcon from '../../../assets/icons/like.svg';
import dislikeIcon from '../../../assets/icons/dislike.svg';
import starIcon from '../../../assets/icons/star.svg';
import classNames from 'classnames';

type Props = {
  name: string;
  createdAt: string;
  title: string;
  evaluation: number;
  comment: string;
  likes: number;
  dislikes: number;
};

export const CommentCard: React.FC<Props> = ({
  name,
  createdAt,
  title,
  evaluation,
  comment,
  likes,
  dislikes,
}) => {
  return (
    <article className="border rounded-lg border-primary/100 flex flex-col gap-1 px-4">
      <div className="flex justify-between py-2 items-center">
        <div className="flex gap-4 items-center">
          <div className="w-11 h-11 rounded-full bg-primary/100"></div>
          <p>{name}</p>
        </div>
        <p>{createdAt}</p>
      </div>
      <div>
        <p className="font-semibold text-lg leading-8 mb-2">{title}</p>
        <ul className="flex">
          {[1, 2, 3, 4, 5].map((_, index) => {
            return (
              <li key={index}>
                <span
                  style={{ maskImage: `url(${starIcon})` }}
                  className={classNames('block w-6 h-6', {
                    'bg-primary/100': index + 1 <= evaluation,
                    'bg-gray/30': index + 1 > evaluation,
                  })}
                ></span>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-lg leading-[22px] py-2">{comment}</p>

      <div className="flex gap-10 py-2 mb-4">
        <div className="flex gap-1 items-center">
          <button type="button">
            <span
              style={{ maskImage: `url(${likeIcon})` }}
              className="block w-6 h-6 bg-primary/100"
            ></span>
          </button>
          <p className="text-lg leading-[22px]">{likes}</p>
        </div>

        <div className="flex gap-1 items-center">
          <p className="text-lg leading-[22px]">{dislikes}</p>
          <button type="button">
            <span
              style={{ maskImage: `url(${dislikeIcon})` }}
              className="block w-6 h-6 bg-primary/100"
            ></span>
          </button>
        </div>
      </div>
    </article>
  );
};
