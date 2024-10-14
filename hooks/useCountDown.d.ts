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
export declare function useCountDown(props: IProps): readonly [number, () => void, () => void];
export {};
