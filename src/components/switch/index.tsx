import { Label } from '@/components/ui/label';
import { Switch } from '../ui/switch';
import { memo, useEffect, useState } from 'react';

interface AppSwitchProps {
    label?: string;
    labelStyle?: string;
    trueLabel?: string;
    falseLabel?: string;
    stateStyle?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

function AppSwitch({
    checked,
    trueLabel = 'Checked',
    falseLabel = 'Unchecked',
    stateStyle = 'text-sm text-gray-500',
    label = 'Switch',
    labelStyle = 'text-sm font-medium',
    onCheckedChange,
}: AppSwitchProps) {
    const [check, setCheck] = useState<boolean>(checked || false);

    useEffect(() => {
        setCheck(checked);
    }, [checked]);

    return (
        <>
            <div className="flex items-center justify-between">
                {label && (
                    <Label htmlFor="isEmailConfirmed" className={labelStyle}>
                        {label}
                    </Label>
                )}
                <Switch checked={check} onCheckedChange={onCheckedChange} />
            </div>
            {trueLabel && falseLabel && <p className={stateStyle}>{check ? trueLabel : falseLabel}</p>}
        </>
    );
}

export default memo(AppSwitch);
