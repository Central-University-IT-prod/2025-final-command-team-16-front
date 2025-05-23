import {cn} from "@/lib/utils";

const Container = ({ children , className}) => {
    return (
        <div className={cn("mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl", className)}>
            {children}
        </div>
    );
};

export default Container;