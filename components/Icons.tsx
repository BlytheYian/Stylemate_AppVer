import React from 'react';
import { Svg, Path, SvgProps } from 'react-native-svg';

// Correctly use SvgProps from react-native-svg and pass the color prop to the stroke attribute.
// This fixes a crash caused by using the web-only "currentColor" string.

export const UserCircleIcon: React.FC<SvgProps> = (props) => (
  <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </Svg>
);

export const ChatBubbleLeftRightIcon: React.FC<SvgProps> = (props) => (
  <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.537V10.07l3.722-.537a1.023 1.023 0 011.023 1.023zM13.5 8.25v8.528l-3.722.537c-1.136.164-2.193-.847-2.193-1.98V9.574c0-.969.616-1.813 1.5-2.097l3.415-1.025a1.023 1.023 0 011.023 1.023z" />
  </Svg>
);

export const ArrowUpTrayIcon: React.FC<SvgProps> = (props) => (
  <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </Svg>
);

export const SparklesIcon: React.FC<SvgProps> = (props) => (
  <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.543L16.5 21.75l-.398-1.207a3.375 3.375 0 00-2.455-2.456L12.75 18l1.207-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.207a3.375 3.375 0 002.456 2.456L20.25 18l-1.207.398a3.375 3.375 0 00-2.456 2.456z" />
  </Svg>
);

export const HeartIcon: React.FC<SvgProps> = (props) => (
  <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </Svg>
);

export const XMarkIcon: React.FC<SvgProps> = (props) => (
  <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </Svg>
);

export const PlusIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </Svg>
);

export const PhotoIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </Svg>
);

export const ChevronRightIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </Svg>
);

export const ArrowUturnLeftIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </Svg>
);

export const PaperAirplaneIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </Svg>
);

export const IdentificationIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </Svg>
);

export const TagIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <Path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </Svg>
);

export const ClockIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Svg>
);

export const ArrowLeftOnRectangleIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </Svg>
);

export const ExclamationTriangleIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </Svg>
);

export const PencilIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </Svg>
);

export const TrashIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </Svg>
);

export const CheckBadgeIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </Svg>
);

export const GoogleIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} viewBox="0 0 48 48" width="48px" height="48px">
        <Path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <Path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <Path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.651-3.358-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"/>
        <Path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.904,36.333,44,30.732,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </Svg>
);

export const BookmarkIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </Svg>
);

export const InboxIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.25 2.25v2.867c0 .53.432.967.967.967h1.466c.535 0 .967-.437.967-.967v-2.867a2.25 2.25 0 012.25-2.25h3.861m-15.536 0A48.11 48.11 0 0112 10.5c2.298 0 4.507.256 6.648.75m-15.536 0c1.076.347 2.27.622 3.536.82m10.464 0c1.266-.198 2.46-.473 3.536-.82M9 13.5v6m6-6v6" />
    </Svg>
);

export const TruckIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h16.5M6 13.5h12" />
    </Svg>
);

export const HandThumbDownIcon: React.FC<SvgProps> = (props) => (
    <Svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={props.color}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.275a2.25 2.25 0 10-4.5 0v8.25a.75.75 0 00.75.75h3.75a2.25 2.25 0 002.25-2.25 2.25 2.25 0 00-2.25-2.25H6.75V4.275c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v3.75m-3.75 0h-.008v.008h.008v-.008zm0 0c.045.03.088.064.128.1a2.25 2.25 0 013.393 2.651l-1.58 3.95A2.25 2.25 0 0113.125 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c.065.21.1.433.1.668 0 .414-.158.79-.437 1.066l-.29.29m-3.375 0c-.279.276-.437.652-.437 1.066 0 .235.035.458.1.668m-3.375 0c.279.276.437.652-.437 1.066 0 .235.035.458.1.668m0 0is.701 1.752 1.902 1.902-1.902 1.902" />
    </Svg>
);
