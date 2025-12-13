import React from "react";
import { Checkbox, Radio, RadioGroup } from "@mantine/core";

const amenitiesList = [
    "WiFi",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Washing Machine",
    "AC",
    "Beds Available",
    "CCTV",
    "24x7 Water",
    "Parking",
    "Geyser",
    "Lift",
    "Daily Cleaning",
    "Personal Locker/Cupboard",
    "Kitchen + Induction Available",
    "Common Dining Space",
    "Common Discussion Space",
];


type LightBill = "included" | "not_included";

interface AmenitiesSelectorProps {
    selectedAmenities: string[];
    onChange: (updatedList: string[]) => void;
    lightBillIncluded: LightBill;
    onLightBillChange: (value: LightBill) => void;
}

const AmenitiesSelector: React.FC<AmenitiesSelectorProps> = ({
    selectedAmenities,
    onChange,
    lightBillIncluded,
    onLightBillChange,
}) => {
    const toggleAmenity = (amenity: string, checked: boolean) => {
        if (checked) {
            if (!selectedAmenities.includes(amenity)) onChange([...selectedAmenities, amenity]);
        } else {
            onChange(selectedAmenities.filter((a) => a !== amenity));
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold">Electricity Bill</h4>
                <RadioGroup value={lightBillIncluded} onChange={(val) => onLightBillChange(val as LightBill)}>
                    <Radio value="included" label="Included in Rent" />
                    <Radio value="not_included" label="Charged Separately" />
                </RadioGroup>
            </div>

            <h3 className="font-heading font-semibold text-lg">Specialities</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-">
                {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2 gap-2">
                        <Checkbox
                            id={`amenity-${amenity}`}
                            checked={selectedAmenities.includes(amenity)}
                            onChange={(event) => toggleAmenity(amenity, (event.currentTarget as HTMLInputElement).checked)}
                        />
                        <label htmlFor={`amenity-${amenity}`} style={{ textTransform: "capitalize", margin: 0 }}>
                            {amenity}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AmenitiesSelector;
