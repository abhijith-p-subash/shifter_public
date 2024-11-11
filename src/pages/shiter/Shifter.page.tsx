import { Button, TextInput, Label } from "flowbite-react";

function Shifter() {
  const arr: string[] = [
    "Ground",
    ...Array.from({ length: 120 }, (_, i) => (i + 1).toString()),
  ];

  return (
    <div className="container mx-auto p-4 my-10">
      <div className="flex flex-col justify-center items-center">
        <div>
          <img src="src/assets/best_place_re.svg" alt="" />
        </div>
        
        {/* Add name, email, and phone number */}
        <div className="w-full max-w-md my-8 shadow-lg rounded-lg p-4">
          <div className="mb-4">
            <Label htmlFor="name" className="mb-2 block text-lg">
              Name
            </Label>
            <TextInput
              id="name"
              type="text"
              placeholder="Enter your name"
              required={true}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="mb-2 block text-lg">
              Email
            </Label>
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              required={true}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="phone" className="mb-2 block text-lg">
              Phone Number
            </Label>
            <TextInput
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              required={true}
              className="w-full"
            />
          </div>
        </div>

        {/* Shifting Details */}
        <div className="shadow-lg rounded-lg p-4 my-8">
          <div className="flex items-center gap-2 text-xl mb-4">
            <p>I’m relocating my</p>
            <select
              name=""
              id=""
              className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0"
            >
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="3+BHK">3+BHK</option>
              <option value="Deluxe Villa">Deluxe Villa</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Others">Others</option>
            </select>
            <p>from</p>
            <input
              placeholder="Starting location"
              className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0"
              type="text"
            />
            <p>to</p>
            <input
              placeholder="Destination location"
              className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0"
              type="text"
            />
            <p>on</p>
            <input
              className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0"
              type="date"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-xl mb-4">
            <p>My current residence is on the</p>
            <select
              name=""
              id=""
              className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0"
            >
              {arr.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <p>floor and there’s a service lift</p>
            <select
              name=""
              id=""
              className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0"
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            <p>for moving. I'm relocating to the</p>
            <select
              name=""
              id=""
              className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0"
            >
              {arr.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <p>floor, and there’s a service lift</p>
            <select
              name=""
              id=""
              className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0"
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            <p>for shifting.</p>
          </div>
          
          <div className="flex justify-center gap-2">
            <Button color="primary">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shifter;
