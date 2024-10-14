interface IProps {
    /**
     * 倒计时(秒)
     */
    time?: number;
    /**
     * 结束的回调
     */
    onEnd?: () => void;
}
export default function useCountDown(props: IProps): readonly [number, () => void, () => void];
export {};
