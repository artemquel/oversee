type ExtractKeysBy<BaseInterface, Target> = {
  [K in keyof BaseInterface]: BaseInterface[K] extends Target ? K : never;
}[keyof BaseInterface];

export type TConstructor = new (...args: any[]) => any;

export type TMethod<Class extends TConstructor> = ExtractKeysBy<
  InstanceType<Class>,
  (...args: unknown[]) => unknown
>;

export type TReturnType<
  Class extends TConstructor,
  Method extends TMethod<Class>
> = Awaited<ReturnType<InstanceType<Class>[Method]>>;

export type TAsyncReturnType<ReturnType> = {
  error: Record<string, unknown>;
  loading: boolean;
  result: ReturnType;
};
