interface UseWriterOptions {
    maxStepSeconds?: number;
    use?: boolean;
}
export declare const useTypeWriter: ({ text, options }: {
    text: string;
    options?: UseWriterOptions | undefined;
}) => string[];
export {};
