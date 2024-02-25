import React, { useCallback, useState } from "react";
import { Box, Text, Stack, Icon, IconButton, useToast, Image } from "@chakra-ui/react";
import { FaFile, FaImage, FaMusic, FaFilm, FaTimes, FaFolder } from "react-icons/fa";

const getFileIcon = (fileType) => {
  if (fileType.startsWith("image")) return FaImage;
  if (fileType.startsWith("audio")) return FaMusic;
  if (fileType.startsWith("video")) return FaFilm;
  if (fileType === "application/vnd.ms-excel") return FaFile;
  return FaFolder;
};

const FileItem = ({ file, onDelete }) => {
  const IconComponent = getFileIcon(file.type);

  return (
    <Box p={2} bg="gray.100" borderRadius="md" position="relative" shadow="base" _hover={{ bg: "gray.200", shadow: "lg" }}>
      <IconButton icon={<FaTimes />} isRound size="sm" position="absolute" top={1} right={1} onClick={onDelete} zIndex={1} visibility="hidden" _groupHover={{ visibility: "visible" }} />
      <Icon as={IconComponent} w={8} h={8} color="gray.500" />
      <Text fontSize="sm" mt={2} noOfLines={1}>
        {file.name}
      </Text>
    </Box>
  );
};

const DropOver = () => {
  const [files, setFiles] = useState([]);
  const toast = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const isFileListEmpty = files.length === 0;

  return (
    <Box onDragOver={handleDragOver} onDrop={handleDrop} p={6} w={300} h={300} bg="white" borderRadius="lg" display="flex" alignItems="center" justifyContent="center" textAlign="center" flexDirection="column" boxShadow="xl" userSelect="none" position="relative" _hover={{ bg: "gray.50" }}>
      {isFileListEmpty ? (
        <Text fontSize="lg" fontWeight="bold">
          DropOver
        </Text>
      ) : (
        <Stack direction="column" spacing={3} w="full" h="full" overflowY="auto">
          {files.map((file, index) => (
            <Box key={index} role="group">
              <FileItem file={file} onDelete={() => removeFile(index)} />
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

const Index = () => {
  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" p={4} bg="gray.50">
      <DropOver />
    </Box>
  );
};

export default Index;
