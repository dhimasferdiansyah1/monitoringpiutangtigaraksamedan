import { useEffect, useState, forwardRef, useMemo, Suspense } from "react";
import { getCustomers } from "./actionSearchCustomerId";
import { Input } from "@/components/ui/input";

interface searchCustomerIdProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  setFormValue?: (name: string, value: string) => void;
  onCustomerSelected: (customer: string) => void;
}

export default forwardRef<HTMLInputElement, searchCustomerIdProps>(
  function SearchCustomerId({ onCustomerSelected }, ref) {
    const [customersSearchInput, setCustomersSearchInput] = useState("");
    const [customers, setCustomers] = useState<any[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isListOpen, setIsListOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

    useEffect(() => {
      const fetchCustomers = async () => {
        const data = await getCustomers();
        setCustomers(data.props.customers);
      };
      fetchCustomers();
    }, []);

    const filteredCustomers = useMemo(() => {
      if (!customersSearchInput.trim()) return [];
      const searchWords = customersSearchInput.trim().split(" ");
      return customers.filter(
        (customer) =>
          customer.customer_name.toLowerCase().includes(searchWords.join("")) ||
          customer.account.toString().includes(searchWords.join("")),
      );
    }, [customersSearchInput, customers]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCustomersSearchInput(event.target.value);
      setIsListOpen(true); // Open the list when typing
    };

    const handleSelectCustomer = (customerId: string) => {
      setSelectedOption(customerId);
      const foundCustomer = customers.find(
        (customer) => customer.id === customerId,
      );
      setSelectedCustomer(foundCustomer);
      setIsListOpen(false); // Close the list after selection
      onCustomerSelected(customerId);
    };

    return (
      <div className="w-full">
        <Input
          id="customer_id"
          ref={ref}
          type="text"
          placeholder="Cari pelanggan..."
          value={customersSearchInput} // Keep input clean
          onChange={handleSearch}
          onClick={() => setIsListOpen(true)} // Open the list when clicking the input
          className={`w-full border p-2 ${
            selectedOption === customersSearchInput
              ? "bg-zinc-200 dark:bg-zinc-900"
              : ""
          }`}
        />
        {isListOpen && filteredCustomers.length > 0 && (
          <div className="mt-1 max-h-40 overflow-y-auto rounded-md border shadow-md">
            {filteredCustomers.map((customer) => (
              <div key={customer.id}>
                <Suspense>
                  <div
                    key={customer.id}
                    onClick={() => handleSelectCustomer(customer.id)}
                    className={`cursor-pointer p-2 ${
                      customer.id === selectedOption
                        ? "bg-zinc-200 dark:bg-zinc-900"
                        : ""
                    }`}
                  >
                    {customer.customer_name} ({customer.account}) -{" "}
                    {customer.alamat}
                  </div>
                </Suspense>
              </div>
            ))}
          </div>
        )}
        {selectedCustomer && (
          <h1 className="mt-2 rounded-md border bg-muted p-2">
            <span className="font-bold">Anda memilih :</span>{" "}
            {selectedCustomer.customer_name} ({selectedCustomer.account}),{" "}
            {selectedCustomer.alamat}
          </h1>
        )}{" "}
        {/* Display selected customer info only when available */}
      </div>
    );
  },
);
