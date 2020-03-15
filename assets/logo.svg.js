import React from "react";

function Logo() {
  return (
    <svg
      className="site-logo"
      xmlns="http://www.w3.org/2000/svg"
      width="145"
      height="50"
      fill="none"
      viewBox="0 0 145 80"
    >
      <g className="logo-cartridge">
        <path fill="#BFBFBF" d="M6 7h44v4.273h6V54H6V7z"></path>
        <path stroke="#000" d="M6 7h44v4.273h6V54H6V7z"></path>
        <path
          fill="#CDCDCD"
          stroke="#000"
          strokeWidth="5"
          d="M50 7.41h3.5V51.5h-45v-49h39v4.91H50z"
        ></path>
        <path
          className="logo-cartridge-art"
          fill="#FFDF00"
          stroke="#000"
          strokeWidth="5"
          d="M19.5 21.154h23v20.528h-23V21.154z"
        ></path>
        <path
          fill="#CDCDCD"
          stroke="#000"
          strokeWidth="2.945"
          d="M18.473 11.291H43.528V14.236H18.473z"
        ></path>
        <path fill="#BFBFBF" d="M6 54H56V59H6z"></path>
      </g>
      <path fill="#BFBFBF" d="M0 72H145V80H0z"></path>
      <path fill="#000" d="M0 65H145V73H0z"></path>
      <path
        className="logo-text"
        fill="#000"
        d="M84.072 23.363c-.79.88-1.948 1.587-3.471 2.124-1.524.537-3.194.806-5.01.806-2.793 0-5.025-.854-6.694-2.563-1.67-1.71-2.564-4.087-2.681-7.134L66.2 14.75c0-2.1.371-3.93 1.114-5.493.742-1.572 1.801-2.778 3.178-3.618 1.387-.85 2.988-1.275 4.805-1.275 2.656 0 4.717.61 6.181 1.831 1.475 1.211 2.335 3.023 2.579 5.435h-4.952c-.175-1.192-.556-2.041-1.142-2.549-.586-.508-1.416-.762-2.49-.762-1.29 0-2.285.547-2.989 1.641-.703 1.094-1.06 2.656-1.069 4.688v1.289c0 2.128.361 3.73 1.084 4.804.732 1.065 1.88 1.597 3.442 1.597 1.338 0 2.334-.298 2.989-.894v-3.31h-3.575v-3.53h8.716v8.76zM95.762 26c-.176-.322-.332-.796-.469-1.42-.908 1.142-2.178 1.713-3.809 1.713-1.494 0-2.763-.45-3.808-1.348-1.045-.908-1.568-2.046-1.568-3.413 0-1.718.635-3.017 1.905-3.896 1.27-.88 3.115-1.319 5.537-1.319h1.523v-.835c0-1.455-.63-2.182-1.89-2.182-1.171 0-1.757.576-1.757 1.728h-4.937c0-1.533.65-2.778 1.948-3.735 1.31-.957 2.974-1.436 4.996-1.436 2.021 0 3.618.494 4.79 1.48 1.171.986 1.772 2.339 1.801 4.058v7.016c.02 1.455.245 2.569.674 3.34V26h-4.936zm-3.091-3.223c.615 0 1.123-.132 1.523-.395.41-.264.703-.562.88-.894v-2.534h-1.436c-1.72 0-2.578.772-2.578 2.315 0 .449.15.815.454 1.098.302.274.688.41 1.157.41zM107.437 10.15l.161 1.86c1.123-1.435 2.631-2.153 4.526-2.153 2.002 0 3.355.796 4.058 2.388 1.074-1.592 2.627-2.388 4.658-2.388 3.213 0 4.863 1.944 4.951 5.83V26h-4.951V15.995c0-.81-.137-1.401-.41-1.772-.274-.371-.772-.557-1.494-.557-.977 0-1.705.435-2.183 1.304l.015.205V26h-4.952v-9.976c0-.83-.131-1.43-.395-1.801s-.767-.557-1.509-.557c-.947 0-1.67.435-2.168 1.304V26h-4.936V10.15h4.629zM136.279 26.293c-2.431 0-4.399-.723-5.903-2.168-1.504-1.455-2.256-3.345-2.256-5.669v-.41c0-1.621.298-3.052.894-4.292.605-1.24 1.484-2.197 2.636-2.871 1.153-.684 2.52-1.026 4.102-1.026 2.227 0 3.984.694 5.273 2.08 1.289 1.378 1.934 3.301 1.934 5.772v1.919h-9.814c.175.889.561 1.587 1.157 2.095.595.508 1.367.761 2.314.761 1.563 0 2.783-.547 3.662-1.64l2.256 2.666c-.615.85-1.489 1.528-2.622 2.036-1.123.498-2.334.747-3.633.747zm-.556-12.627c-1.446 0-2.305.957-2.578 2.871h4.98v-.38c.02-.792-.181-1.402-.601-1.832-.42-.44-1.02-.659-1.801-.659zM77.612 48.331c0-.752-.268-1.338-.805-1.758-.528-.42-1.46-.854-2.798-1.303-1.338-.45-2.432-.884-3.281-1.304-2.764-1.358-4.146-3.223-4.146-5.596 0-1.181.342-2.222 1.025-3.12.694-.908 1.67-1.611 2.93-2.11 1.26-.507 2.676-.761 4.248-.761 1.533 0 2.905.273 4.116.82 1.221.547 2.168 1.328 2.842 2.344.674 1.006 1.01 2.158 1.01 3.457h-5.126c0-.87-.269-1.543-.806-2.022-.527-.478-1.245-.717-2.153-.717-.918 0-1.646.205-2.183.615-.527.4-.79.913-.79 1.538 0 .547.292 1.045.878 1.494.586.44 1.617.899 3.091 1.377 1.475.469 2.686.977 3.633 1.524 2.305 1.328 3.457 3.159 3.457 5.493 0 1.865-.703 3.33-2.11 4.394-1.406 1.065-3.334 1.597-5.786 1.597-1.728 0-3.296-.308-4.702-.923-1.396-.625-2.45-1.474-3.164-2.549-.703-1.084-1.055-2.329-1.055-3.735h5.157c0 1.142.293 1.987.879 2.534.595.537 1.557.806 2.885.806.85 0 1.519-.18 2.007-.542.498-.371.747-.889.747-1.553zM89.99 39.85c1.055-1.328 2.403-1.993 4.043-1.993 1.748 0 3.067.518 3.955 1.553.889 1.035 1.343 2.564 1.363 4.585V54h-4.952v-9.888c0-.84-.17-1.455-.512-1.845-.342-.4-.923-.601-1.743-.601-1.016 0-1.734.322-2.154.967V54h-4.936V31.5h4.936v8.35zM109.766 54.293c-2.432 0-4.4-.723-5.904-2.168-1.504-1.455-2.256-3.345-2.256-5.669v-.41c0-1.621.298-3.052.894-4.292.605-1.24 1.484-2.197 2.637-2.871 1.152-.684 2.519-1.026 4.101-1.026 2.227 0 3.985.694 5.274 2.08 1.289 1.378 1.933 3.301 1.933 5.772v1.919h-9.814c.176.889.561 1.587 1.157 2.095.596.508 1.367.761 2.315.761 1.562 0 2.783-.547 3.662-1.64l2.256 2.666c-.616.85-1.49 1.528-2.623 2.036-1.123.498-2.334.747-3.632.747zm-.557-12.627c-1.445 0-2.305.957-2.578 2.871h4.98v-.38c.02-.792-.18-1.402-.6-1.832-.42-.44-1.021-.659-1.802-.659zM123.652 54h-4.951V31.5h4.951V54zM127.798 54V41.578h-2.3V38.15h2.3v-1.26c0-1.806.532-3.207 1.597-4.203 1.064-.997 2.558-1.495 4.482-1.495.703 0 1.475.103 2.314.308l.015 3.633c-.303-.088-.708-.132-1.216-.132-1.494 0-2.241.645-2.241 1.934v1.215h3.091v3.428h-3.091V54h-4.951z"
      ></path>
    </svg>
  );
}

export default Logo;